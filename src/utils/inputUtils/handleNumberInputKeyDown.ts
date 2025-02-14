import { IHandleNumberInputKeyDownArgs } from './numberFieldHandlers.types';

/**
 * Handler for pressing up/down keys to change the value
 * - Adjusts the step dynamically based on the current value.
 * - Clamps the value within a specified min/max range.
 * - Formats the final value before updating the field.
 */
export const handleNumberInputKeyDown = ({
  e,
  field,
  min,
  max,
  formatter,
  normalizedDecimalPlaces,
}: IHandleNumberInputKeyDownArgs) => {
  // Block input of minus, space and alphabetic characters (e.g. 'e' for exponential numbers)
  if (e.key === '-' || e.key === ' ' || e.key === 'e') {
    e.preventDefault();
    return;
  }

  // Exit early if the key pressed is not ArrowUp or ArrowDown
  if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

  e.preventDefault();

  // Normalize value (replace commas with dots for consistency in parsing)
  let currentValue = field.value.toString().replace(',', '.');
  let numericValue = Number(currentValue);

  // Exit if the value is not a valid number
  if (isNaN(numericValue)) return;

  let step = 1;

  if (currentValue.includes('.')) {
    // Define step for fractional numbers
    const decimalLength = currentValue.split('.')[1]?.length || 0;
    step = decimalLength === 1 ? 0.1 : decimalLength === 2 ? 0.01 : 0.001;
  } else {
    // Determine the step for integers depending on their range
    if (numericValue >= 1000) step = 100;
    else if (numericValue >= 100) step = 10;
    else step = 1;
  }

  // Calculate the new value based on key direction
  const newValue = e.key === 'ArrowUp' ? numericValue + step : numericValue - step;
  if (newValue < 0) return;
  // Clamp the value within the min/max boundaries
  const clampedValue = Math.min(Math.max(newValue, min ?? -Infinity), max ?? Infinity);

  // Apply formatting and update the field value
  field.onChange(formatter(clampedValue, normalizedDecimalPlaces));
};
