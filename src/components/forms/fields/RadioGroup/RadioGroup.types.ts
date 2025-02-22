import { Control } from 'react-hook-form';

export interface IOption {
  value: string;
  option: string;
}

export interface IRadioGroupProps {
  name: string;
  options: IOption[];
  control: Control<any>;
  label: string;
  error?: string;
  disabled?: boolean;
  id?: string;
}
