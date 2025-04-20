import { InputHTMLAttributes } from 'react';

export interface IControlledNumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  id?: string;
  value: number;
  onChange: (value: number) => void;

  min?: number;
  max?: number;
  decimalPlaces?: number;
  autoFocus?: boolean;
  inputMode?: 'decimal' | 'numeric';
  isUnits?: boolean;

  className?: string;
}
