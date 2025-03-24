import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { IFormProps } from './Form.types';
// import { useDispatch } from 'react-redux';

export const Form = <T extends FieldValues>({ schema, defaultValues, children }: IFormProps<T>) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data: T) => {
    console.log('Отправка формы:', data);
    // dispatch({ type: 'form/saveStep1', payload: data }); // Заглушка для Redux
    navigate('/step2');
  };

  console.log('Ошибки формы:', methods.formState.errors);

  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>;
};
