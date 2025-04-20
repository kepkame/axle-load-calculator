import { Control, FieldErrors, FieldArrayWithId } from 'react-hook-form';
import {
  AxleLoadDataItem,
  FormSchemaType,
} from '@pages/Step1/components/TransportForm/TransportForm.types';

// Type of one element of axleLoadData array in useFieldArray with ID included
export type AxleFieldArrayItem = FieldArrayWithId<FormSchemaType, 'axleLoadData', 'id'>;

export interface IAxleLoadTableProps {
  fields: AxleFieldArrayItem[]; // Axis array obtained via useFieldArray, with service IDs included
  control: Control<FormSchemaType>;
  name: 'axleLoadData';
  trigger: (name?: any) => Promise<boolean>; // Trigger for manual validation of specific fields
  constraints: {
    // Constraints from the validation scheme
    axleLoadEmpty: { min: number; max: number };
    axleLoadLimit: { min: number; max: number };
  };
  errors?: FieldErrors<AxleLoadDataItem>[]; // Errors bound to each array element
}
