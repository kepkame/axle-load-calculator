import { Control } from 'react-hook-form';

export interface Option {
  value: string;
  option: string;
}

export interface RadioGroupProps {
  name: string;
  options: Option[];
  control: Control<any>;
  label: string;
  tooltip?: string | React.ReactElement;
  error?: string;
  disabled?: boolean;
  id?: string;
}
