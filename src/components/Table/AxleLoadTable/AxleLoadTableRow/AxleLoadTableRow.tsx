import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { IAxleLoadTableRowProps } from './AxleLoadTableRow.types';
import { AxleLoadTableRowErrors } from '../AxleLoadTableRowErrors/AxleLoadTableRowErrors';
import { AxleLoadTableData } from '../AxleLoadTableData/AxleLoadTableData';
import IconTruck from '@assets/icons/truck.svg?react';
import IconTruckCargo from '@assets/icons/truck-cargo.svg?react';
import styles from './AxleLoadTableRow.module.scss';

export const AxleLoadTableRow: React.FC<IAxleLoadTableRowProps> = ({
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
  const axleLoadEmptyName = `axleLoadData.${index}.axleLoadEmpty` as const;
  const axleLoadLimitName = `axleLoadData.${index}.axleLoadLimit` as const;

  const axleLoadEmptyValue = useWatch({ control, name: axleLoadEmptyName });
  const axleLoadLimitValue = useWatch({ control, name: axleLoadLimitName });

  // If one of the values is changed manually, we call validation on both
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

        {/* Field axleLoadEmpty */}
        <AxleLoadTableData
          icon={<IconTruck className={styles.icon} />}
          label="Без груза"
          fieldName={axleLoadEmpty}
          control={control}
          min={constraints.axleLoadEmpty.min}
          max={constraints.axleLoadEmpty.max}
          isErrors={errors?.axleLoadEmpty !== undefined}
        />

        {/* Field axleLoadLimit */}
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

      {/* Validation errors for the entire string */}
      <AxleLoadTableRowErrors errors={errors} />
    </>
  );
};
