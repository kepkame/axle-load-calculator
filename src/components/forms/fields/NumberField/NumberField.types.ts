import { UseControllerProps } from 'react-hook-form';

export interface NumberFieldProps
  extends Omit<UseControllerProps<any>, 'defaultValue'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  id?: string;
  min?: number;
  max?: number;
  decimalPlaces?: number;
  isUnits?: boolean;
  showRange?: boolean;
  /** Function to format the value when focus is lost. */
  formatter?: (value: number, decimalPlaces: number) => string;
  ref?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
}
