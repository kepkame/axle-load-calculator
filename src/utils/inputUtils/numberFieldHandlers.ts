import { getDecimalRegex } from '@utils/numberUtils/validationUtils';
import { formatNumberToDecimals } from '@utils/numberUtils/formatUtils';
import {
  HandleNumberInputChangeArgs,
  HandleNumberInputBlurArgs,
} from './numberFieldHandlers.types';

/**
 * Handler for changing the value in the field:
 * - Replaces a comma with a period.
 * - Checks the value by regular expression.
 */
export const handleNumberInputChange = ({
  e,
  decimalPlaces,
  onChange,
}: HandleNumberInputChangeArgs) => {
  const rawValue = e.target.value.trim();
  const sanitizedValue = rawValue.replace(',', '.');
  const decimalRegex = getDecimalRegex(decimalPlaces);

  // If the value is empty, clear the field
  if (sanitizedValue === '') {
    onChange('');
    return;
  }

  // Check if the entered value corresponds to a valid numeric format
  if (decimalRegex.test(sanitizedValue)) {
    onChange(sanitizedValue);
  }
};

/**
 * Blur event handler:
 * - Applies a process to process the entered value.
 * - Calls field.onBlur to inform react-hook-form.
 */
export const handleNumberInputBlur = ({
  e,
  decimalPlaces,
  onChange,
  onBlur,
}: HandleNumberInputBlurArgs) => {
  const value = e.target.value.trim();
  // If the field is empty - save the empty string
  if (value === '') {
    onChange('');
    onBlur();
    return;
  }

  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    // If the value is not a number (NaN), reset the field
    onBlur();
    return;
  }

  // Formatting a number before saving
  const formattedValue = formatNumberToDecimals(numericValue, decimalPlaces);

  // Update the value (convert to a number if possible)
  onChange(formattedValue);
  onBlur();
};
