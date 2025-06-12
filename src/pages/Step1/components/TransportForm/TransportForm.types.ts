import { Control, FieldError, FieldErrors, FieldPath, UseFieldArrayUpdate } from 'react-hook-form';
import type {
  FormSchemaType,
  FormContext,
  AxleFieldArrayItem,
  AxleLoadDataItem,
} from '@entities/step1Form/types';

// Type for errors of a single array element
export type AxleLoadDataItemErrors = {
  axleLoadEmpty?: FieldError;
  axleLoadLimit?: FieldError;
};

// Type for the entire axleLoadData error array
export type AxleLoadDataErrors = FieldErrors<AxleLoadDataItem>[] | undefined;

// Interface for passing form control and error handling
export interface TransportFormProps {
  control: Control<FormSchemaType, FormContext>;
  errors: FieldErrors<FormSchemaType>;
  trigger: (name?: FieldPath<FormSchemaType> | FieldPath<FormSchemaType>[]) => Promise<boolean>;
  fields: AxleFieldArrayItem[];
  update: UseFieldArrayUpdate<FormSchemaType, 'axleLoadData'>;
  truckAxles: number;
  trailerAxles: number;
}

// Props for form sections such as TruckFormSection and TrailerFormSection
export interface FormSectionProps {
  control: Control<FormSchemaType, FormContext>;
  errors: FieldErrors<FormSchemaType>;
  constraints: Record<string, unknown>;
  wheelbaseValues: number[];
  fields: AxleFieldArrayItem[];
  update: UseFieldArrayUpdate<FormSchemaType, 'axleLoadData'>;
  axleCount: number;
}
