import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { formSchema } from './validation';

interface ITransportFormProps {
  control: Control<typeof formSchema._type>;
  errors: FieldErrors<typeof formSchema._type>;
}

export const TransportForm: React.FC<ITransportFormProps> = ({ control, errors }) => {
  return (
    <>
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
    </>
  );
};
