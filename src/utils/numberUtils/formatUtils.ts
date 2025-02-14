/**
 * Function for formatting numbers with a given number of decimal places.
 */
export const defaultFormatter = (value: number, decimalPlaces: number): string => {
  return decimalPlaces > 0 ? value.toFixed(decimalPlaces) : Math.round(value).toString();
};

/**
 * Corrects rounding errors for floating point numbers (IEEE 754).
 * Uses multiplication by 10^decimalPlaces before rounding.
 */
export const fixFloatingPointError = (num: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
};
