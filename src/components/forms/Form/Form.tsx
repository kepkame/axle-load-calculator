import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps } from './Form.types';

/**
 * Generic Form component using react-hook-form and Zod schema validation.
 */
export const Form = <T extends FieldValues>({
  schema,
  defaultValues,
  children,
  resolverContext,
  onSubmitSuccess,
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    context: resolverContext,
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: T) => {
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }
  };

  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>;
};
