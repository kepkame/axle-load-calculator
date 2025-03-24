// import { Control, FieldError, FieldArrayWithId } from 'react-hook-form';
// import { FormSchemaType } from '@pages/Step1/TransportForm.types';

// export interface IAxleLoadTableProps {
//   fields: FieldArrayWithId<FormSchemaType, 'axleLoadData'>[];
//   control: Control<FormSchemaType>;
//   constraints: {
//     axleLoadEmpty: { min: number; max: number };
//     axleLoadLimit: { min: number; max: number };
//   };
//   // errors?: FieldErrors<FormSchemaType>['axleLoadData'];
//   errors?: Record<number, { axleLoadEmpty?: FieldError; axleLoadLimit?: FieldError }>;
// }

import { Control, FieldArrayWithId } from 'react-hook-form';
import { AxleLoadDataErrors, FormSchemaType } from '@pages/Step1/TransportForm.types';

export interface IAxleLoadTableProps {
  fields: FieldArrayWithId<FormSchemaType, 'axleLoadData'>[];
  control: Control<FormSchemaType>;
  constraints: {
    axleLoadEmpty: { min: number; max: number };
    axleLoadLimit: { min: number; max: number };
  };
  errors?: AxleLoadDataErrors;
}
