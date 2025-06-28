import clsx from 'clsx';
import { getStatusClass } from '../utils/getStatusClass';
import { LoadStatusRowProps } from './LoadStatusRow.types';
import styles from './../LoadStatusTable.module.scss';

/**
 * Renders a single axle row in the axle load status table.
 *
 * - Applies color class based on utilization percent (danger/warning/success).
 * - Shows "(подъёмная)" tag for lifted axles.
 * - Actual and max loads always shown with fixed decimals.
 */
export const LoadStatusRow: React.FC<LoadStatusRowProps> = ({ row }) => {
  const { axleType, index, actualLoad, maxLoad, lifted } = row;
  const getAxleTitle = axleType === 'truck' ? `Ось тягача ${index}` : `Ось полуприцепа ${index}`;

  // Selects color modifier for the value cell
  const axleStatusClass = getStatusClass(actualLoad, maxLoad);

  return (
    <tr className={styles.row}>
      <td className={styles.data}>
        {getAxleTitle}
        {lifted && <span className={styles.dataLiftedTag}> (подъёмная)</span>}
      </td>

      <td className={clsx(styles.data, axleStatusClass)}>
        {actualLoad.toFixed(2)} из {maxLoad.toFixed(1)} т.
      </td>
    </tr>
  );
};
