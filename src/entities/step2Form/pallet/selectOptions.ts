import { PALLET_SIZES } from './constants';
import { Option } from '@components/forms/fields/SelectField/SelectField.types';

/**
 * Generates select field options based on predefined pallet sizes.
 */
export const palletSizeOptions: Option[] = PALLET_SIZES.map((p) => ({
  value: p.id,
  label: p.label,
}));
