import { AxleLoadDataItem } from '../components/TransportForm/TransportForm.types';
import { AXLE_LOAD_DEFAULTS } from '../constants/axleOptions';

/**
 * Generates an array of axle data based on the raw axle count input.
 *
 * - Truck axles include up to two "leading" axles with higher load limits.
 * - If a fractional truck axle is given (e.g., 2.5), a lifted axle is inserted in position 1.
 * - Trailer axles are added with uniform default values.
 */
export const prepareAxleFields = (
  truckAxlesRaw: number,
  trailerAxlesRaw: number,
): AxleLoadDataItem[] => {
  const result: AxleLoadDataItem[] = [];
  const hasLifted = truckAxlesRaw % 1 !== 0;

  // Determine number of standard (non-lifted) truck axles
  const baseTruckAxles = Math.floor(truckAxlesRaw);

  // Add standard truck axles to the result
  for (let i = 0; i < baseTruckAxles; i++) {
    const isLeading = i < 2; // First two axles are considered leading

    result.push({
      axleType: 'truck',
      axleLoadEmpty: isLeading
        ? AXLE_LOAD_DEFAULTS.truckLeading.axleLoadEmpty
        : AXLE_LOAD_DEFAULTS.truckStandard.axleLoadEmpty,
      axleLoadLimit: isLeading
        ? AXLE_LOAD_DEFAULTS.truckLeading.axleLoadLimit
        : AXLE_LOAD_DEFAULTS.truckStandard.axleLoadLimit,
    });
  }

  if (hasLifted) {
    result.splice(1, 0, {
      axleType: 'truck',
      axleLoadEmpty: AXLE_LOAD_DEFAULTS.truckStandard.axleLoadEmpty,
      axleLoadLimit: AXLE_LOAD_DEFAULTS.truckStandard.axleLoadLimit,
      lifted: true,
    });
  }

  // Add trailer axles to the result
  for (let i = 0; i < trailerAxlesRaw; i++) {
    result.push({
      axleType: 'trailer',
      axleLoadEmpty: AXLE_LOAD_DEFAULTS.trailerStandard.axleLoadEmpty,
      axleLoadLimit: AXLE_LOAD_DEFAULTS.trailerStandard.axleLoadLimit,
    });
  }

  return result;
};
