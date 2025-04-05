import { syncAxleFieldsParams } from './axleFieldSync.types';

export const syncAxleFields = ({
  currentFieldsLength,
  truckAxlesRaw,
  trailerAxlesRaw,
  append,
  remove,
}: syncAxleFieldsParams): void => {
  // Round down to get the base number of truck axles (e.g., 2 from 2.5)
  const baseTruckAxles = Math.floor(truckAxlesRaw);

  // Check whether a lifted axle is included (e.g., 2.5 means there's a lifted axle)
  const hasLiftedAxle = truckAxlesRaw % 1 !== 0;

  // Total truck axles = base + lifted axle if applicable
  const totalTruckAxles = baseTruckAxles + (hasLiftedAxle ? 1 : 0);

  // Calculate the total number of axles across both truck and trailer
  const totalAxles = totalTruckAxles + trailerAxlesRaw;

  // Append new axle entries if there are fewer fields than required
  if (totalAxles > currentFieldsLength) {
    for (let i = currentFieldsLength; i < totalAxles; i += 1) {
      const isTruck = i < totalTruckAxles;

      // Determine if this axle is a lifted axle (last one on the truck side)
      const isLifted = isTruck && hasLiftedAxle && i === totalTruckAxles - 1;

      // Add a new axle with default load values
      append(
        {
          axleType: isTruck ? 'truck' : 'trailer',
          axleLoadEmpty: isTruck ? (i < 2 ? 29.99 : 13) : 13,
          axleLoadLimit: isTruck ? (i < 2 ? 46.77 : 17) : 17,
          lifted: isLifted || undefined, // only set if true
        },
        { shouldFocus: false },
      );
    }
  } else if (totalAxles < currentFieldsLength) {
    // Remove extra axle entries if there are too many
    for (let i = currentFieldsLength; i > totalAxles; i -= 1) {
      remove(i - 1); // remove the last field
    }
  }
};
