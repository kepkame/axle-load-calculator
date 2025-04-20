import { Control } from 'react-hook-form';

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  name: string;
  control: Control<any>;
  placeholder?: string;
}
