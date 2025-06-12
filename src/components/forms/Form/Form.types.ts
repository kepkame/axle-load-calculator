import { UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { ZodSchema } from 'zod';
import type { FormContext } from '@entities/step1Form/types';

export interface FormProps<T extends FieldValues, TContext = FormContext> {
  schema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  children: (methods: UseFormReturn<T, TContext>) => React.ReactNode;
  resolverContext?: TContext;
  onSubmitSuccess?: (data: T) => void;
}
