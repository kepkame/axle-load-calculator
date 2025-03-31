import { AxleLoadTableData } from '../AxleLoadTableData/AxleLoadTableData';
import { AxleLoadTableRowErrors } from '../AxleLoadTableRowErrors/AxleLoadTableRowErrors';
import IconTruck from '@assets/icons/truck.svg?react';
import IconTruckCargo from '@assets/icons/truck-cargo.svg?react';
import { IAxleLoadTableRowProps } from './AxleLoadTableRow.types';
import styles from './AxleLoadTableRow.module.scss';

export const AxleLoadTableRow: React.FC<IAxleLoadTableRowProps> = ({
  control,
  errors,
  label,
  axleLoadEmpty,
  axleLoadLimit,
  isLifted = false,
  constraints,
}) => {
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
