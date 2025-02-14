// import { BaseField } from '@components/forms/BaseField/BaseField';
// import { NumberField } from '@components/forms/fields/NumberField/NumberField';
// import { Button } from '@components/ui/Button/Button';
import { FormDefault } from '@components/forms/Form/Form';
import React from 'react';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// const schemaForm = z.object({
//   age: z.number().min(18, 'Вы слишком молоды!').max(90, 'Какой же вы старый!'),
//   name: z.string().min(2, 'Слишком короткое имя!'),
// });

// type TSchemaForm = z.infer<typeof schemaForm>;

const Step1Page: React.FC = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   control,
  // } = useForm<TSchemaForm>({
  //   resolver: zodResolver(schemaForm),
  // });

  // const onSubmit: SubmitHandler<TSchemaForm> = (data) => {
  //   console.log('Данные формы:', data);
  // };

  return (
    <div>
      Step1Page
      <div>
        <FormDefault />
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <BaseField label="Ваш возраст" error={errors.age?.message}>
            <NumberField
              {...register('age')}
              control={control}
              error={errors.age?.message}
              placeholder="Age"
            />
          </BaseField>
          <div>
            <label htmlFor="name">Имя</label>
            <input id="alc-r1" {...register('name')} type="text" placeholder="Текст" />
            {errors?.name?.message && <p>{errors.name?.message || 'Error'}</p>}
          </div>
          <Button isSmall={true} type="submit" disabled={isSubmitting}>
            Отправить
          </Button>
        </form> */}
      </div>
    </div>
  );
};

export default Step1Page;
