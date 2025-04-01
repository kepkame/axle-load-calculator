import { useEffect } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { RadioGroup } from '@components/forms/fields/RadioGroup/RadioGroup';
import { TruckSideView } from '@components/visualization/TruckSideView/TruckSideView';
import { AxleLoadTable } from '@components/Table/AxleLoadTable/AxleLoadTable';
import { formSchema } from './validation/validation';
import { getConstraintsFromSchema } from './validation/validationUtils';
import type { ITransportFormProps } from './TransportForm.types';
import { syncAxleFields } from './utils/axleFieldSync';
import styles from './TransportForm.module.scss';

// Extracting constraints from the validation schema
const constraints = getConstraintsFromSchema(formSchema);
const axleLoadConstraints = constraints.axleLoadData as {
  axleLoadEmpty: { min: number; max: number };
  axleLoadLimit: { min: number; max: number };
};

export const TransportForm: React.FC<ITransportFormProps> = ({ control, errors, trigger }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'axleLoadData' });
  const truckAxlesRaw = parseFloat(useWatch({ control, name: 'truckAxles' }) as string) || 0;
  const trailerAxlesRaw = parseFloat(useWatch({ control, name: 'trailerAxles' }) as string) || 0;

  useEffect(() => {
    syncAxleFields({
      currentFieldsLength: fields.length,
      truckAxlesRaw,
      trailerAxlesRaw,
      append,
      remove,
    });
  }, [fields.length, truckAxlesRaw, trailerAxlesRaw, append, remove]);

  return (
    <>
      {/* Truck data block */}
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
            showRange={true}
            inputMode="numeric"
            autoFocus={true}
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
            showRange={true}
            inputMode="decimal"
          />
        </BaseField>
      </fieldset>

      {/* Trailer data block */}
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
            showRange={true}
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
            showRange={true}
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
            showRange={true}
            inputMode="decimal"
          />
        </BaseField>
      </fieldset>

      {/* Truck visualization */}
      <TruckSideView TractorAxleCount={2} TrailerAxleCount={3} />

      {/* Axle load table */}
      <AxleLoadTable
        fields={fields}
        control={control}
        trigger={trigger}
        errors={Array.isArray(errors.axleLoadData) ? errors.axleLoadData : []}
        constraints={axleLoadConstraints}
      />
    </>
  );
};
