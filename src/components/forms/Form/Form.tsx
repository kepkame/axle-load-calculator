import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BaseField } from '../BaseField/BaseField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
// import styles from './Form.module.scss';

// Define a Zod schema for form validation
export const formSchema = z.object({
  truckWeight: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(10, 'Минимальное значение: 10').max(10000, 'Максимальное значение: 10 000')),
  truckWheelbase: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(1.0, 'Минимальное значение: 1.0').max(5.0, 'Максимальное значение: 5.0')),
  trailerWeight: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(10, 'Минимальное значение: 10').max(10000, 'Максимальное значение: 10 000')),
  trailerWheelbase: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(1.0, 'Минимальное значение: 1.0').max(5.0, 'Максимальное значение: 5.0')),
});

type TFormSchema = z.infer<typeof formSchema>;

export const FormDefault: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      truckWeight: 1000,
      truckWheelbase: 1.1,
      trailerWeight: 1000,
      trailerWheelbase: 1.1,
    },
  });

  const onSubmit: SubmitHandler<TFormSchema> = (data) => {
    console.log('data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Данные о тягаче</legend>
        <BaseField label="Собственный вес тягача" error={errors.truckWeight?.message} units="кг">
          <NumberField
            name="truckWeight"
            control={control}
            maxLength={5}
            inputMode="numeric"
            autoFocus={true}
            showRange={true}
          />
        </BaseField>

        <BaseField
          label="Межосевое расстояние осей тягача"
          error={errors.truckWheelbase?.message}
          units="метров"
        >
          <NumberField
            name="truckWheelbase"
            control={control}
            maxLength={5}
            decimalPlaces={3}
            inputMode="decimal"
            showRange={true}
          />
        </BaseField>
      </fieldset>

      <fieldset>
        <legend>Данные полуприцепа</legend>
        <BaseField
          label="Собственный вес полуприцепа"
          error={errors.trailerWeight?.message}
          units="кг"
        >
          <NumberField name="trailerWeight" control={control} maxLength={5} inputMode="numeric" />
        </BaseField>

        <BaseField
          label="Межосевое расстояние осей полуприцепа"
          error={errors.trailerWheelbase?.message}
          units="метров"
        >
          <NumberField
            name="trailerWheelbase"
            control={control}
            maxLength={5}
            decimalPlaces={1}
            inputMode="decimal"
          />
        </BaseField>
      </fieldset>

      <button type="submit">Отправить</button>
    </form>
  );
};
