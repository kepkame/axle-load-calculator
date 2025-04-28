import { BaseField } from '@components/forms/BaseField/BaseField';
import { SelectField } from '@components/forms/fields/SelectField/SelectField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { palletSizeOptions } from '@entities/step2Form/pallet/selectOptions';
import { useAllQuantityConstraints } from '../../utils/useQuantityConstraints';
import { CargoFormProps } from './CargoForm.types';
import { HeaderGroup } from '../HeaderGroup/HeaderGroup';
import styles from './CargoForm.module.scss';

/**
 * Visual component for editing cargo groups.
 *
 * Renders a dynamic list of pallet groups with fields for pallet dimensions,
 * weight, and quantity, respecting validation constraints derived from platform length.
 */
export const CargoForm: React.FC<CargoFormProps> = ({
  control,
  errors,
  fields,
  remove,
  constraints,
  trigger,
  deckLengthMM,
}) => {
  // Computes maximum allowed quantities dynamically for each group based on platform length
  const maxValues = useAllQuantityConstraints({ control, deckLengthMM });

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className={styles.group}>
            {/* Renders group header with drag-and-drop and remove actions if multiple groups exist */}
            {fields.length > 1 && <HeaderGroup index={index} onClick={() => remove(index)} />}

            {/* Select field for choosing pallet size */}
            <BaseField
              label="Габариты паллет"
              error={errors.cargoGroup?.[index]?.palletId?.message}
              tooltip="Выберите стандартный размер паллет для правильного распределения груза на платформе."
            >
              <SelectField
                name={`cargoGroup.${index}.palletId`}
                control={control}
                options={palletSizeOptions}
                placeholder="Выберите тип паллеты"
              />
            </BaseField>

            {/* Input field for specifying weight per pallet */}
            <BaseField
              label="Вес"
              units="кг"
              error={errors.cargoGroup?.[index]?.weight?.message}
              tooltip={`Укажите вес одной паллеты в этой группе. Максимально допустимый вес – ${constraints.weight.max} кг.`}
            >
              <NumberField
                name={`cargoGroup.${index}.weight`}
                control={control}
                min={constraints.weight.min}
                max={constraints.weight.max}
                maxLength={4}
                inputMode="numeric"
                showRange
              />
            </BaseField>

            {/* Input field for specifying quantity of pallets in the group */}
            <BaseField
              label="Количество"
              units="шт"
              error={errors.cargoGroup?.[index]?.quantity?.message}
              tooltip={`Укажите количество паллет в этой группе. Общая длина паллет не должна превышать длину платформы указанную на предыдущем шаге – ${
                deckLengthMM / 1000
              }м.`}
            >
              <NumberField
                name={`cargoGroup.${index}.quantity`}
                control={control}
                min={constraints.quantity.min}
                max={maxValues[index] ?? constraints.quantity.max}
                maxLength={2}
                inputMode="numeric"
                showRange
                // Triggers validation for all groups on blur to update constraints if needed
                onBlur={() => trigger('cargoGroup')}
              />
            </BaseField>
          </div>
        );
      })}
    </div>
  );
};
