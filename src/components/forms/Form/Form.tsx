import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormContext } from '@entities/step1Form/types';
import type { FormProps } from './Form.types';

/**
 * Generic Form component using react-hook-form and Zod schema validation.
 */
export const Form = <T extends Record<string, any>, TContext = FormContext>({
  schema,
  defaultValues,
  children,
  resolverContext,
  onSubmitSuccess,
}: FormProps<T, TContext>) => {
  const methods = useForm<T, TContext>({
    resolver: zodResolver(schema),
    context: resolverContext,
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: T) => {
    onSubmitSuccess?.(data);
  };

  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>;
};
