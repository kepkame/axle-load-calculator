import { Control } from 'react-hook-form';
import { FormSchemaType } from '@pages/Step1/components/TransportForm/TransportForm.types';

export interface IAxleLoadTableDataProps {
  icon: React.ReactNode;
  label: string;
  fieldName: string;
  control: Control<FormSchemaType>;
  min: number;
  max: number;
  maxLength?: number;
  decimalPlaces?: number;
  inputMode?: 'numeric' | 'decimal';
  isErrors: boolean;
}
