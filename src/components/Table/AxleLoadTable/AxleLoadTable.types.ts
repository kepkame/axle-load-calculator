import { Control, FieldErrors } from 'react-hook-form';
import type { FormSchemaType, FormContext, AxleLoadDataItem } from '@entities/step1Form/types';
import type { AxleFieldArrayItem } from '@entities/step1Form/types';

export interface AxleLoadTableProps {
  fields: AxleFieldArrayItem[]; // Axis array obtained via useFieldArray, with service IDs included
  control: Control<FormSchemaType, FormContext>;
  name: 'axleLoadData';
  trigger: (name?: any) => Promise<boolean>; // Trigger for manual validation of specific fields
  constraints: {
    // Constraints from the validation scheme
    axleLoadEmpty: { min: number; max: number };
    axleLoadLimit: { min: number; max: number };
  };
  errors?: FieldErrors<AxleLoadDataItem>[]; // Errors bound to each array element
}
