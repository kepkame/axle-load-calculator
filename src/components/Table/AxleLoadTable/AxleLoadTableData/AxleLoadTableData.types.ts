import { Control, FieldPath } from 'react-hook-form';
import type { FormSchemaType, FormContext } from '@entities/step1Form/types';

export interface AxleLoadTableDataProps {
  icon: React.ReactNode;
  label: string;

  fieldName: FieldPath<FormSchemaType>;
  control: Control<FormSchemaType, FormContext>;

  min: number;
  max: number;
  maxLength?: number;
  decimalPlaces?: number;
  inputMode?: 'numeric' | 'decimal';
  isErrors?: boolean;
  readOnly?: boolean;
}
