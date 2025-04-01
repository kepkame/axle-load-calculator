import { Control, FieldArrayWithId, FieldPath } from 'react-hook-form';
import { AxleLoadDataErrors, FormSchemaType } from '@pages/Step1/TransportForm.types';

export interface IAxleLoadTableProps {
  fields: FieldArrayWithId<FormSchemaType, 'axleLoadData'>[];
  control: Control<FormSchemaType>;
  trigger: (name?: FieldPath<FormSchemaType> | FieldPath<FormSchemaType>[]) => Promise<boolean>;
  constraints: {
    axleLoadEmpty: { min: number; max: number };
    axleLoadLimit: { min: number; max: number };
  };
  errors?: AxleLoadDataErrors;
}
