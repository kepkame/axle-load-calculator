import React from 'react';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { RadioGroup } from '@components/forms/fields/RadioGroup/RadioGroup';
import { FormSectionProps } from './TransportForm.types';
import styles from './TransportForm.module.scss';

export const TruckFormSection: React.FC<FormSectionProps> = ({ control, errors, constraints }) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend>Данные о тягаче</legend>

      <BaseField
        label="Собственный вес тягача"
        error={errors.truckWeight?.message}
        tooltip="Собственный вес тягача без груза. Обычно указан в технической документации."
        units="кг"
      >
        <NumberField
          name="truckWeight"
          control={control}
          min={(constraints.truckWeight as { min: number; max: number }).min}
          max={(constraints.truckWeight as { min: number; max: number }).max}
          maxLength={5}
          showRange
          inputMode="numeric"
          autoFocus
        />
      </BaseField>

      <RadioGroup
        name="truckAxles"
        options={[
          { value: '2', option: '2' },
          { value: '2.5', option: '2.5' },
          { value: '3', option: '3' },
        ]}
        label="Количество осей тягача"
        tooltip="Общее число осей тягача. Обычно 2 оси у лёгких моделей, 3 оси у тяжёлых."
        control={control}
        error={errors.truckAxles?.message}
      />

      <BaseField
        label="Межосевое расстояние осей тягача"
        error={errors.truckWheelbase?.message}
        tooltip="Расстояние между ближайшими осями тягача, измеряется от центра одной оси до другой."
        units="метров"
      >
        <NumberField
          name="truckWheelbase"
          control={control}
          min={(constraints.truckWheelbase as { min: number; max: number }).min}
          max={(constraints.truckWheelbase as { min: number; max: number }).max}
          maxLength={5}
          decimalPlaces={1}
          showRange
          inputMode="decimal"
        />
      </BaseField>
    </fieldset>
  );
};
