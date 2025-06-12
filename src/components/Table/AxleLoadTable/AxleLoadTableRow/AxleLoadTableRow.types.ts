import { Control, FieldPath } from 'react-hook-form';
import type { FormSchemaType, FormContext } from '@entities/step1Form/types';
import type { AxleLoadDataItemErrors } from '@pages/Step1/components/TransportForm/TransportForm.types';

export interface AxleLoadTableRowProps {
  control: Control<FormSchemaType, FormContext>;
  trigger: (name?: FieldPath<FormSchemaType> | FieldPath<FormSchemaType>[]) => Promise<boolean>;
  errors: AxleLoadDataItemErrors | undefined;
  label: string;
  index: number;
  axleId: string;
  axleLoadEmpty: FieldPath<FormSchemaType>;
  axleLoadLimit: FieldPath<FormSchemaType>;
  isLifted?: boolean;
  constraints: {
    axleLoadEmpty: { min: number; max: number };
    axleLoadLimit: { min: number; max: number };
  };
}
