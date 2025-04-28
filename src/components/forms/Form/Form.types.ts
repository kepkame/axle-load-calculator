import { UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface FormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  resolverContext?: unknown;
  onSubmitSuccess?: (data: T) => void;
}
