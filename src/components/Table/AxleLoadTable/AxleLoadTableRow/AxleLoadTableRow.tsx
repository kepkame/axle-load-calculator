import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { AxleLoadTableRowProps } from './AxleLoadTableRow.types';
import { AxleLoadTableRowErrors } from '../AxleLoadTableRowErrors/AxleLoadTableRowErrors';
import { AxleLoadTableData } from '../AxleLoadTableData/AxleLoadTableData';
import IconTruck from '@assets/icons/truck.svg?react';
import IconTruckCargo from '@assets/icons/truck-cargo.svg?react';
import styles from './AxleLoadTableRow.module.scss';

export const AxleLoadTableRow: React.FC<AxleLoadTableRowProps> = ({
  control,
  trigger,
  errors,
  label,
  index,
  axleLoadEmpty,
  axleLoadLimit,
  isLifted = false,
  constraints,
}) => {
  // Construct field names using the array index
  const axleLoadEmptyName = `axleLoadData.${index}.axleLoadEmpty` as const;
  const axleLoadLimitName = `axleLoadData.${index}.axleLoadLimit` as const;

  // Watch current values for re-validation purposes
  const axleLoadEmptyValue = useWatch({ control, name: axleLoadEmptyName });
  const axleLoadLimitValue = useWatch({ control, name: axleLoadLimitName });

  useEffect(() => {
    trigger([axleLoadEmptyName, axleLoadLimitName]);
  }, [axleLoadEmptyValue, axleLoadLimitValue, axleLoadEmpty, axleLoadLimit, trigger]);

  return (
    <>
      <tr className={styles.row}>
        {/* Name axle */}
        <td className={styles.label}>
          {label}
          {isLifted}
        </td>

        {/* Field: axle load without cargo */}
        <AxleLoadTableData
          icon={<IconTruck className={styles.icon} />}
          label="Без груза"
          fieldName={axleLoadEmpty}
          control={control}
          min={constraints.axleLoadEmpty.min}
          max={constraints.axleLoadEmpty.max}
          isErrors={errors?.axleLoadEmpty !== undefined}
        />

        {/* Field: maximum allowed axle load */}
        <AxleLoadTableData
          icon={<IconTruckCargo className={styles.icon} />}
          label="Максимальная нагрузка"
          fieldName={axleLoadLimit}
          control={control}
          min={constraints.axleLoadLimit.min}
          max={constraints.axleLoadLimit.max}
          isErrors={errors?.axleLoadLimit !== undefined}
        />
      </tr>

      {/* Renders validation error messages if any exist for this row */}
      <AxleLoadTableRowErrors errors={errors} />
    </>
  );
};
