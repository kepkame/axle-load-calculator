import { BaseField } from '@components/forms/BaseField/BaseField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { RadioGroup } from '@components/forms/fields/RadioGroup/RadioGroup';
import { ToggleOptionGroup } from '@components/ui/ToggleOptionGroup/ToggleOptionGroup';
import type { ToggleOption } from '@components/ui/ToggleOptionGroup/ToggleOptionGroup.types';
import { useToggleOptionGroupLogic } from '@entities/step1Form/hooks/useToggleOptionGroupLogic';
import { generateWheelbaseKeys } from '../../utils/generateWheelbaseKeys';
import type { FormSectionProps } from './TransportForm.types';
import styles from './TransportForm.module.scss';

/**
 * Renders input fields related to the semi-trailer configuration.
 *
 * Used within Step1 form to capture trailer-specific transport parameters.
 */
export const TrailerFormSection: React.FC<FormSectionProps> = ({
  control,
  errors,
  constraints,
  wheelbaseValues,
  fields,
  update,
  axleCount,
}) => {
  const { min, max } = constraints.trailerWheelbase as { min: number; max: number };

  // Guarantees at least one wheelbase field; avoids UI/validation inconsistencies
  const trailerAxleCount = Math.max(2, wheelbaseValues.length + 1);
  const allKeys = generateWheelbaseKeys(0, trailerAxleCount);
  const trailerKeys = allKeys.filter((k) => k.startsWith('trailer-'));

  // Handles toggleable lift axle selection.
  const { actualIndices, selectedRelative, handleToggle } = useToggleOptionGroupLogic({
    fields,
    control,
    update,
    axleType: 'trailer',
    axleCount,
  });

  // Create toggle options for each eligible axle (except last)
  const liftOptions: ToggleOption[] = actualIndices
    .map((globalIdx, relIdx) => ({
      axleId: fields[globalIdx].axleId,
      label: String(relIdx + 1),
      selected: selectedRelative === relIdx,
      onToggle: () => handleToggle(relIdx),
    }))
    .filter((_, relIdx) => {
      const isOnlyFirstAllowed = axleCount === 2;
      const isNotLast = relIdx < axleCount - 1;

      return (isOnlyFirstAllowed && relIdx === 0) || (!isOnlyFirstAllowed && isNotLast);
    });

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

      <ToggleOptionGroup options={liftOptions} label="Подъёмная ось полуприцепа (если есть)" />

      {wheelbaseValues.map((_, idx) => (
        <BaseField
          key={trailerKeys[idx] || `trailer-wheelbase-${idx}`}
          label={`Расстояние между ${idx + 1} и ${idx + 2} осями прицепа`}
          error={errors.trailerWheelbase?.[idx]?.message}
          tooltip="Измеряется от центра одной оси до центра следующей."
          units="метров"
        >
          <NumberField
            name={`trailerWheelbase.${idx}` as const}
            control={control}
            min={min}
            max={max}
            maxLength={5}
            decimalPlaces={2}
            showRange
            inputMode="decimal"
            isUnits
          />
        </BaseField>
      ))}

      <BaseField
        label="Длина сцепного устройства"
        error={errors.couplingLength?.message}
        tooltip="Расстояние от сцепного устройства до точки сцепки с полуприцепом."
        units="метров"
      >
        <NumberField
          name="couplingLength"
          control={control}
          min={(constraints.couplingLength as { min: number; max: number }).min}
          max={(constraints.couplingLength as { min: number; max: number }).max}
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
