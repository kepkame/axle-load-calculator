import { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import type { FormSchemaType } from '@entities/step1Form/types';
import { DEFAULT_AXLE_VALUES } from '../constants/axleOptions';

export interface SyncAxleFieldsParams {
  currentFieldsLength: number;
  truckAxlesRaw: number;
  trailerAxlesRaw: number;
  append: UseFieldArrayAppend<FormSchemaType, 'axleLoadData'>;
  remove: UseFieldArrayRemove;
}

/**
 * Ensures the axleLoadData array matches the current total axle count (truck + trailer).
 *
 * - Removes surplus fields if axle count is reduced
 * - Appends default fields for new axles if increased
 * - Uses truck/trailer-specific defaults for initial values
 */
export const syncAxleFields = ({
  currentFieldsLength: currentTotal,
  truckAxlesRaw,
  trailerAxlesRaw,
  append,
  remove,
}: SyncAxleFieldsParams): void => {
  const totalAxles = truckAxlesRaw + trailerAxlesRaw;

  //  Remove fields if the form currently has more than required
  if (currentTotal > totalAxles) {
    for (let i = currentTotal - 1; i >= totalAxles; i--) {
      remove(i);
    }
  } else if (currentTotal < totalAxles) {
    // Append missing fields if axle count increased
    for (let i = currentTotal; i < totalAxles; i++) {
      const isTruck = i < truckAxlesRaw;

      let axleLoadEmpty: number;
      let axleLoadLimit: number;

      if (isTruck) {
        const truckIndex = i;

        // First two truck axles get separate default config
        const isLeadAxle = truckIndex < 2;

        const defaults = isLeadAxle
          ? DEFAULT_AXLE_VALUES.truck.lead
          : DEFAULT_AXLE_VALUES.truck.other;

        axleLoadEmpty = defaults.axleLoadEmpty;
        axleLoadLimit = defaults.axleLoadLimit;
      } else {
        axleLoadEmpty = DEFAULT_AXLE_VALUES.trailer.axleLoadEmpty;
        axleLoadLimit = DEFAULT_AXLE_VALUES.trailer.axleLoadLimit;
      }

      append(
        {
          axleType: isTruck ? 'truck' : 'trailer',
          axleLoadEmpty,
          axleLoadLimit,
          lifted: false,
        },
        { shouldFocus: false }, // Avoid focus-jump when appending new items dynamically
      );
    }
  }
};
