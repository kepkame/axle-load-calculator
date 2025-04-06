import { BaseField } from '@components/forms/BaseField/BaseField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { RadioGroup } from '@components/forms/fields/RadioGroup/RadioGroup';
import { IFormSectionProps } from './TransportForm.types';
import styles from './TransportForm.module.scss';

export const TrailerFormSection: React.FC<IFormSectionProps> = ({
  control,
  errors,
  constraints,
}) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend>Данные полуприцепа</legend>
      <BaseField
        label="Собственный вес полуприцепа"
        error={errors.trailerWeight?.message}
        tooltip="Вес пустого полуприцепа без груза. Указан в документации или на табличке прицепа."
        units="кг"
      >
        <NumberField
          name="trailerWeight"
          control={control}
          min={(constraints.trailerWeight as { min: number; max: number }).min}
          max={(constraints.trailerWeight as { min: number; max: number }).max}
          maxLength={5}
          showRange
          inputMode="numeric"
        />
      </BaseField>

      <RadioGroup
        name="trailerAxles"
        options={[
          { value: '2', option: '2' },
          { value: '3', option: '3' },
          { value: '4', option: '4' },
        ]}
        label="Количество осей прицепа"
        tooltip="Общее число осей полуприцепа. Обычно 2 оси у лёгких моделей, 3-4 оси у тяжёлых."
        control={control}
        error={errors.trailerAxles?.message}
      />

      <RadioGroup
        name="couplingLength"
        options={[
          { value: '1.20', option: '1.20' },
          { value: '1.35', option: '1.35' },
          { value: '1.50', option: '1.50' },
          { value: '1.60', option: '1.60' },
        ]}
        label="Длина сцепного устройства (метров)"
        tooltip="Расстояние от сцепного устройства до точки сцепки с полуприцепом."
        control={control}
        error={errors.couplingLength?.message}
      />

      <BaseField
        label="Межосевое расстояние осей полуприцепа"
        error={errors.trailerWheelbase?.message}
        tooltip="Расстояние между осями полуприцепа, измеряется по центрам осей."
        units="метров"
      >
        <NumberField
          name="trailerWheelbase"
          control={control}
          min={(constraints.trailerWheelbase as { min: number; max: number }).min}
          max={(constraints.trailerWheelbase as { min: number; max: number }).max}
          maxLength={5}
          decimalPlaces={2}
          showRange
          inputMode="decimal"
        />
      </BaseField>

      <BaseField
        label="Длина платформы"
        error={errors.deckLength?.message}
        tooltip="Общая длина грузовой платформы полуприцепа. Это расстояние от переднего края платформы (начало грузового отсека) до её заднего края. Обычно 13,6 м для стандартных моделей."
        units="метров"
      >
        <NumberField
          name="deckLength"
          control={control}
          min={(constraints.deckLength as { min: number; max: number }).min}
          max={(constraints.deckLength as { min: number; max: number }).max}
          maxLength={5}
          decimalPlaces={2}
          showRange
          inputMode="decimal"
        />
      </BaseField>
    </fieldset>
  );
};
