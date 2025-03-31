import { z } from 'zod';
import { formSchema } from '@pages/Step1/validation/validation';
import { Control, FieldError, FieldErrors } from 'react-hook-form';

export type FormSchemaType = z.infer<typeof formSchema>;

// Type for a single element of the axleLoadData array
export type AxleLoadDataItem = FormSchemaType['axleLoadData'][number];

// Type for errors of a single array element
export type AxleLoadDataItemErrors = {
  axleLoadEmpty?: FieldError;
  axleLoadLimit?: FieldError;
};

// Type for the entire axleLoadData error array
export type AxleLoadDataErrors = FieldErrors<AxleLoadDataItem>[] | undefined;

// Interface for passing form control and error handling
export interface ITransportFormProps {
  control: Control<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
}
