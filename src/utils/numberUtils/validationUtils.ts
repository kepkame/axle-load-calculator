/**
 * Processing of value at blur event:
 * - If the value is empty or equal to '-', an empty string is returned.
 * - Converting a string to a number.
 * - Limiting a value between min and max.
 * - Formatting a number using formatter.
 */
export const processBlurValue = (
  value: string,
  min: number,
  max: number,
  decimalPlaces: number,
  formatter: (value: number, decimalPlaces: number) => string,
): string => {
  if (value === '-' || value === '') {
    return '';
  }
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return '';
  }
  const clampedValue = Math.min(Math.max(numberValue, min), max);

  return formatter(clampedValue, decimalPlaces);
};

/**
 * Limits the number of decimal places in the range of 0 to 3.
 */
export const normalizeDecimalPlaces = (decimalPlaces: number): number => {
  if (typeof decimalPlaces !== 'number' || isNaN(decimalPlaces)) {
    return 0;
  }

  return Math.min(Math.max(Math.abs(decimalPlaces), 0), 3);
};

/**
 * RegExp generation for validation of numeric input taking into account decimalPlaces.
 */
export const getDecimalRegex = (decimalPlaces: number): RegExp => {
  const normalized = normalizeDecimalPlaces(decimalPlaces);

  // If the number is an integer, disallow point input
  return normalized > 0 ? new RegExp(`^\\d*(\\.\\d{0,${normalized}})?$`) : new RegExp(`^\\d*$`);
};
