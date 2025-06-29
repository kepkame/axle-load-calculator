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
export const TruckFormSection: React.FC<FormSectionProps> = ({
  control,
  errors,
  constraints,
  wheelbaseValues,
  fields,
  update,
  axleCount,
}) => {
  const { min, max } = constraints.truckWheelbase as { min: number; max: number };

  // Ensures at least one wheelbase field even for minimal axle count
  const truckAxleCount = Math.max(2, wheelbaseValues.length + 1);
  const allKeys = generateWheelbaseKeys(truckAxleCount, 0);
  const truckKeys = allKeys.filter((k) => k.startsWith('truck-'));

  // Handles toggleable lift axle selection
  const { actualIndices, selectedRelative, handleToggle } = useToggleOptionGroupLogic({
    fields,
    control,
    update,
    axleType: 'truck',
    axleCount,
  });

  // Create toggle options for each eligible axle (except first)
  const liftOptions: ToggleOption[] = actualIndices.slice(1).map((globalIdx, uiIdx) => ({
    axleId: fields[globalIdx].axleId,
    label: String(uiIdx + 2), // +2 because the first axle is skipped
    selected: selectedRelative === uiIdx + 1,
    onToggle: () => handleToggle(uiIdx + 1),
  }));

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
        />
      </BaseField>

      <RadioGroup
        name="truckAxles"
        options={[
          { value: '2', option: '2' },
          { value: '3', option: '3' },
        ]}
        label="Количество осей тягача"
        tooltip="Общее число осей тягача. Обычно 2 оси у лёгких моделей, 3 оси у тяжёлых."
        control={control}
        error={errors.truckAxles?.message}
      />

      {axleCount > 2 && (
        <ToggleOptionGroup options={liftOptions} label="Подъёмная ось тягача (если есть)" />
      )}

      {/* Always display the wheelbase fields, even if there are only 1 */}
      {wheelbaseValues.map((_, idx) => (
        <BaseField
          key={truckKeys[idx] || `truck-wheelbase-${idx}`}
          label={`Расстояние между ${idx + 1} и ${idx + 2} осями тягача`}
          error={errors.truckWheelbase?.[idx]?.message}
          tooltip="Измеряется от центра одной оси до центра следующей."
          units="метров"
        >
          <NumberField
            name={`truckWheelbase.${idx}` as const}
            control={control}
            min={min}
            max={max}
            decimalPlaces={2}
            showRange
            inputMode="decimal"
            isUnits
          />
        </BaseField>
      ))}
    </fieldset>
  );
};
