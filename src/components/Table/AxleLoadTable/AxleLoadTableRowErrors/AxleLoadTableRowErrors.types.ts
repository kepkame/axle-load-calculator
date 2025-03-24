// import { FieldError } from 'react-hook-form';

// export interface IAxleLoadTableRowErrorsProps {
//   index: number;
//   errors?: { axleLoadEmpty?: FieldError; axleLoadLimit?: FieldError }[];
// }

import { AxleLoadDataItemErrors } from '@pages/Step1/TransportForm.types';

export interface IAxleLoadTableRowErrorsProps {
  errors?: AxleLoadDataItemErrors;
}
