import { Control, FieldPath } from 'react-hook-form';
import { FormSchemaType } from '@pages/Step1/components/TransportForm/TransportForm.types';

export interface IAxleLoadTableDataProps {
  icon: React.ReactNode;
  label: string;

  fieldName: FieldPath<FormSchemaType>;
  control: Control<FormSchemaType>;

  min: number;
  max: number;
  maxLength?: number;
  decimalPlaces?: number;
  inputMode?: 'numeric' | 'decimal';
  isErrors?: boolean;
  readOnly?: boolean;
}
