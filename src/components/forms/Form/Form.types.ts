import { UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';

export interface IFormProps<T extends FieldValues> {
  schema: any;
  defaultValues: DefaultValues<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
}
