import clsx from 'clsx';
import { Tooltip } from '@components/feedback/Tooltip/Tooltip';
import { calcTotalWeights } from '@utils/calculations/calcTotalWeights';
import { CargoWeightTooltipContent } from './CargoWeightTooltipContent';
import { LoadStatusTableFooterProps } from './LoadStatusTableFooter.types';
import { getStatusClass } from '../utils/getStatusClass';
import styles from './../LoadStatusTable.module.scss';

/**
 * Table footer: shows total calculated cargo + vehicle weight and limit.
 * Highlights cell based on total load status.
 */
export const LoadStatusTableFooter: React.FC<LoadStatusTableFooterProps> = ({
  step1Data,
  step2Data,
}) => {
  const truckWeightKg = step1Data.truckWeight;
  const trailerWeightKg = step1Data.trailerWeight;

  const truckAxles = parseInt(step1Data.truckAxles, 10) || 0;
  const trailerAxles = parseInt(step1Data.trailerAxles, 10) || 0;

  // Calculates total cargo weight from all cargo groups
  const cargoWeightKg = Array.isArray(step2Data.cargoGroup)
    ? step2Data.cargoGroup.reduce((sum, { weight, quantity }) => sum + weight * quantity, 0)
    : 0;

  // Computes total and allowed weight in tons
  const { totalWeightTons, maxAllowedTons } = calcTotalWeights({
    truckWeightKg,
    trailerWeightKg,
    cargoWeightKg,
    truckAxles,
    trailerAxles,
  });

  // Highlights value cell if overloaded (danger/warning)
  const axleStatusClass = getStatusClass(totalWeightTons, maxAllowedTons);

  return (
    <tfoot>
      <tr className={styles.row}>
        <td className={clsx(styles.data, styles.dataFooter)}>Общая масса груза</td>
        <td className={clsx(styles.data, axleStatusClass)}>
          {totalWeightTons.toFixed(1)} из {maxAllowedTons} т.{' '}
          <Tooltip>
            <CargoWeightTooltipContent />
          </Tooltip>
        </td>
      </tr>
    </tfoot>
  );
};
