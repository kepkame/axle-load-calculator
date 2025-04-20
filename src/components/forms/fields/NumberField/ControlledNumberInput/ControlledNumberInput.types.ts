import { NumberFieldProps } from '../NumberField.types';

export interface ControlledNumberInputProps
  extends Omit<
    NumberFieldProps,
    'name' | 'onChange' | 'showRange' | 'formatter' | 'ref' | 'autoFocus' | 'value'
  > {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  inputMode?: 'decimal' | 'numeric';

  min?: number;
  max?: number;
  decimalPlaces?: number;
  autoFocus?: boolean;
  isUnits?: boolean;
}
