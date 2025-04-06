import { z } from 'zod';
import { formSchema } from '@entities/step1Form/schema';
import { Control, FieldError, FieldErrors, FieldPath } from 'react-hook-form';

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
  trigger: (name?: FieldPath<FormSchemaType> | FieldPath<FormSchemaType>[]) => Promise<boolean>;
}

// Props for form sections such as TruckFormSection and TrailerFormSection
export interface IFormSectionProps {
  control: Control<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  constraints: Record<string, unknown>;
}
