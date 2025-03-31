import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormProps } from './Form.types';

export const Form = <T extends FieldValues>({
  schema,
  defaultValues,
  children,
  onSubmitSuccess,
}: IFormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data: T) => {
    console.log('Отправка формы:', data);
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }
  };

  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>;
};
