import { Control } from 'react-hook-form';

export interface IOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  options: IOption[];
  name: string;
  control: Control<any>;
  placeholder?: string;
}
