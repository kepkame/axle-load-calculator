import { fixFloatingPointError } from '@utils/numberUtils/formatUtils';

/** Function for step calculation */
export const calculateStep = (value: number, decimalPlaces: number): number => {
  if (decimalPlaces > 0) {
    return 1 / Math.pow(10, decimalPlaces);
  } else {
    if (value >= 1000) return 100;
    if (value >= 100) return 10;
    return 1;
  }
};

/**
 * Rounds a number to the nearest multiple of `step`, given max.
 */
export const roundToNearestStep = (
  val: number,
  step: number,
  max: number,
  decimalPlaces: number,
): number => {
  // Calculate the nearest multiple of `step`
  const adjustedValue = Math.ceil(val / step) * step;

  // Fix possible floating point errors
  const roundedValue = fixFloatingPointError(adjustedValue, decimalPlaces);

  // Limit it to the maximum value
  return Math.min(roundedValue, max);
};
