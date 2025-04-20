import { useRef, useEffect } from 'react';
import { AxleLoadDataItem } from '../components/TransportForm/TransportForm.types';
import { AxleFieldArrayItem } from '@components/Table/AxleLoadTable/AxleLoadTable.types';
import { prepareAxleFields } from '../utils/prepareAxleFields';
import { generateAxleKeys } from '../utils/generateAxleKeys';

interface AxleConfigSnapshot {
  truck: number;
  trailer: number;
}

// Cache type for storing axle data keyed by unique string identifiers
export type AxleCache = Record<string, AxleLoadDataItem>;

/**
 * Keeps the form's axleLoadData field array in sync
 * with the current number of truck/trailer axles. Uses a cached structure
 * to preserve previously entered values when possible.
 *
 * Only replaces the array when axle config changes. Also skips update
 * if current config matches saved values and form is already filled.
 */
export function useAxleArraySync(
  fields: AxleFieldArrayItem[],
  truckAxlesRaw: number,
  trailerAxlesRaw: number,
  replace: (arr: AxleLoadDataItem[]) => void, // Replaces entire field array
  axleCacheRef: { current: AxleCache }, // Ref-based cache to retain field
  isFormFilled: boolean,
  savedTruckAxles: number,
  savedTrailerAxles: number,
) {
  // Store previous axle configuration to avoid unnecessary replacements
  const prevConfigRef = useRef<AxleConfigSnapshot | null>(null);

  const baseTruck = Math.floor(truckAxlesRaw);
  const hasLifted = truckAxlesRaw % 1 !== 0;
  const totalExpected = baseTruck + (hasLifted ? 1 : 0) + trailerAxlesRaw;
  // const hasLiftedInFields = fields.some((f) => f.lifted === true);
  const hasLiftedInFields = fields.some((f) => f.lifted === true && f.axleType === 'truck');

  useEffect(() => {
    // Skip sync if form is already filled and axle values match saved state
    if (
      isFormFilled &&
      truckAxlesRaw === savedTruckAxles &&
      trailerAxlesRaw === savedTrailerAxles &&
      fields.length === totalExpected &&
      (!hasLifted || (hasLifted && hasLiftedInFields))
    ) {
      return;
    }

    const prev = prevConfigRef.current;

    // Exit early if axle config hasn't changed since last sync
    if (prev?.truck === truckAxlesRaw && prev.trailer === trailerAxlesRaw) return;

    // Generate new field structure based on updated axle config
    const newAxleFields = prepareAxleFields(truckAxlesRaw, trailerAxlesRaw);

    const keys = generateAxleKeys({ truckAxles: truckAxlesRaw, trailerAxles: trailerAxlesRaw });

    for (let i = 0; i < newAxleFields.length; i++) {
      const key = keys[i];
      const cached = axleCacheRef.current[key];

      // Merge cached values back into newly generated fields
      if (cached) {
        newAxleFields[i].axleLoadEmpty = cached.axleLoadEmpty;
        newAxleFields[i].axleLoadLimit = cached.axleLoadLimit;

        // Handle restored "lifted" flag for truck axles based on key naming convention
        if (newAxleFields[i].axleType === 'truck') {
          if (key.includes('-lifted')) {
            newAxleFields[i].lifted = true;
          } else {
            delete newAxleFields[i].lifted;
          }
        }
      }
    }

    replace(newAxleFields);

    // Save current configuration for future change detection
    prevConfigRef.current = { truck: truckAxlesRaw, trailer: trailerAxlesRaw };
  }, [truckAxlesRaw, trailerAxlesRaw, fields, replace, axleCacheRef]);
}
