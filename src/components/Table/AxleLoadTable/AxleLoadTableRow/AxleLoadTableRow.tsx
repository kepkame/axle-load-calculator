import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWatch } from 'react-hook-form';
import IconTruck from '@assets/icons/truck.svg?react';
import IconTruckCargo from '@assets/icons/truck-cargo.svg?react';
import { setAxleCache } from '@store/slices/step1FormSlice/step1FormSlice';
import { AxleLoadTableData } from '../AxleLoadTableData/AxleLoadTableData';
import { AxleLoadTableRowErrors } from '../AxleLoadTableRowErrors/AxleLoadTableRowErrors';
import type { AxleLoadTableRowProps } from './AxleLoadTableRow.types';
import styles from './AxleLoadTableRow.module.scss';

/**
 * Renders a single row in the axle load table.
 */
export const AxleLoadTableRow: React.FC<AxleLoadTableRowProps> = ({
  control,
  trigger,
  errors,
  label,
  index,
  axleId,
  axleLoadEmpty,
  axleLoadLimit,
  isLifted = false,
  constraints,
}) => {
  const dispatch = useDispatch();

  const axleItem = useWatch({
    control,
    name: `axleLoadData.${index}`,
  });

  const {
    axleType,
    axleLoadEmpty: axleLoadEmptyValue,
    axleLoadLimit: axleLoadLimitValue,
    lifted: liftedValue,
  } = axleItem ?? {};

  // Cache the latest input state to Redux to persist across steps
  useEffect(() => {
    if (!axleId || !axleType) return;
    dispatch(
      setAxleCache([
        {
          axleId,
          axleType,
          axleLoadEmpty: axleLoadEmptyValue,
          axleLoadLimit: axleLoadLimitValue,
          lifted: liftedValue,
        },
      ]),
    );
  }, [axleId, axleType, axleLoadEmptyValue, axleLoadLimitValue, liftedValue, dispatch]);

  useEffect(() => {
    // Re-trigger validation when the user changes values manually
    trigger([`axleLoadData.${index}.axleLoadEmpty`, `axleLoadData.${index}.axleLoadLimit`]);
  }, [axleLoadEmptyValue, axleLoadLimitValue, trigger, index]);

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

      {/* Show validation messages below the row if needed */}
      <AxleLoadTableRowErrors errors={errors} />
    </>
  );
};
