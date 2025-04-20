import { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { FormSchemaType } from '../components/TransportForm/TransportForm.types';

export interface syncAxleFieldsParams {
  currentFieldsLength: number;
  truckAxlesRaw: number;
  trailerAxlesRaw: number;
  append: UseFieldArrayAppend<FormSchemaType, 'axleLoadData'>;
  remove: UseFieldArrayRemove;
}

/**
 * Synchronizes the axleLoadData field array to match the given axle configuration.
 *
 * - Removes excess fields when the new configuration has fewer axles.
 * - Appends new fields when the configuration includes additional axles.
 * - Supports lifted truck axles (e.g. 2.5 = 2 + 1 lifted axle).
 * - Prevents focusing newly added fields for smoother UX.
 */
export const syncAxleFields = ({
  currentFieldsLength,
  truckAxlesRaw,
  trailerAxlesRaw,
  append,
  remove,
}: syncAxleFieldsParams): void => {
  const baseTruckAxles = Math.floor(truckAxlesRaw);
  const hasLiftedAxle = truckAxlesRaw % 1 !== 0;
  const totalTruckAxles = baseTruckAxles + (hasLiftedAxle ? 1 : 0);
  const totalAxles = totalTruckAxles + trailerAxlesRaw;
  const currentTotal = currentFieldsLength;

  // If there are too many fields, remove extras from the end
  if (currentTotal > totalAxles) {
    for (let i = currentTotal - 1; i >= totalAxles; i--) {
      remove(i);
    }
  }
  // If there are too few fields, append new ones
  else if (currentTotal < totalAxles) {
    for (let i = currentTotal; i < totalAxles; i++) {
      const isTruck = i < totalTruckAxles;

      // Determine if this axle is a lifted axle (last one on the truck side)
      const isLifted = isTruck && hasLiftedAxle && i === totalTruckAxles - 1;

      append(
        {
          axleType: isTruck ? 'truck' : 'trailer',

          // Default values vary depending on axle type and position
          axleLoadEmpty: isTruck ? (i < 2 ? 29.99 : 13) : 13,
          axleLoadLimit: isTruck ? (i < 2 ? 46.77 : 17) : 17,

          // Set lifted only if true, omit otherwise to keep form state clean
          lifted: isLifted || undefined, // only set if true
        },
        { shouldFocus: false }, // Avoid auto-focus on new fields to reduce distraction
      );
    }
  }
};
