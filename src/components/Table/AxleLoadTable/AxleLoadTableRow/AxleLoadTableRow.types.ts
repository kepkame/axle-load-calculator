import { Control, FieldPath } from 'react-hook-form';
import {
  AxleLoadDataItemErrors,
  FormSchemaType,
} from '@pages/Step1/components/TransportForm/TransportForm.types';

export interface IAxleLoadTableRowProps {
  control: Control<FormSchemaType>;
  trigger: (name?: FieldPath<FormSchemaType> | FieldPath<FormSchemaType>[]) => Promise<boolean>;
  errors: AxleLoadDataItemErrors | undefined;
  label: string;
  index: number;
  axleLoadEmpty: string;
  axleLoadLimit: string;
  isLifted?: boolean;
  constraints: {
    axleLoadEmpty: { min: number; max: number };
    axleLoadLimit: { min: number; max: number };
  };
}
