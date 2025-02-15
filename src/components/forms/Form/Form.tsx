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
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(4800, 'Минимальное значение: 4800').max(12000, 'Максимальное значение: 12 000')),
  truckWheelbase: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(2.0, 'Минимальное значение: 2.0').max(5.0, 'Максимальное значение: 5.0')),
  trailerWeight: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(4000, 'Минимальное значение: 4000').max(10000, 'Максимальное значение: 10 000')),
  trailerWheelbase: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(1.0, 'Минимальное значение: 1.0').max(3.0, 'Максимальное значение: 3.0')),
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
      truckWeight: 8200,
      truckWheelbase: 3.6,
      trailerWeight: 7000,
      trailerWheelbase: 1.32,
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
            showRange={true}
            inputMode="numeric"
            autoFocus={true}
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
            decimalPlaces={1}
            showRange={true}
            inputMode="decimal"
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
          <NumberField
            name="trailerWeight"
            control={control}
            maxLength={5}
            showRange={true}
            inputMode="numeric"
          />
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
            decimalPlaces={2}
            showRange={true}
            inputMode="decimal"
          />
        </BaseField>
      </fieldset>

      <button type="submit">Отправить</button>
    </form>
  );
};
