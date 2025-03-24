// import { Control, FieldError } from 'react-hook-form';
// import { FormSchemaType } from '@pages/Step1/TransportForm.types';

// export interface IAxleLoadTableRowProps {
//   control: Control<FormSchemaType>;
//   errors: Array<{ axleLoadEmpty?: FieldError; axleLoadLimit?: FieldError }>;
//   index: number;
//   label: string;
//   axleLoadEmpty: string;
//   axleLoadLimit: string;
//   constraints: {
//     axleLoadEmpty: { min: number; max: number };
//     axleLoadLimit: { min: number; max: number };
//   };
// }

import { Control } from 'react-hook-form';
import { AxleLoadDataItemErrors, FormSchemaType } from '@pages/Step1/TransportForm.types';

export interface IAxleLoadTableRowProps {
  control: Control<FormSchemaType>;
  errors: AxleLoadDataItemErrors | undefined;
  label: string;
  axleLoadEmpty: string;
  axleLoadLimit: string;
  isLifted?: boolean;
  constraints: {
    axleLoadEmpty: { min: number; max: number };
    axleLoadLimit: { min: number; max: number };
  };
}
