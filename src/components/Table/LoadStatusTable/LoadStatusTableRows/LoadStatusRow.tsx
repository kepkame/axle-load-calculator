import clsx from 'clsx';
import { LoadStatusRowProps } from './LoadStatusRow.types';
import styles from './../LoadStatusTable.module.scss';

export const LoadStatusRow: React.FC<LoadStatusRowProps> = ({ row }) => {
  const { axleType, index, actualLoad, maxLoad, lifted } = row;

  const getStatusClass = (): string => {
    const percent = actualLoad / maxLoad;
    if (percent <= 0.85) return styles.dataSuccess;
    if (percent <= 1.0) return styles.dataWarning;
    return styles.dataDanger;
  };

  const getAxleTitle = (): string =>
    axleType === 'truck' ? `Ось тягача ${index}` : `Ось полуприцепа ${index}`;

  return (
    <tr className={clsx(styles.row, styles[status])}>
      <td className={styles.data}>
        {getAxleTitle()}
        {lifted && <span className={styles.dataLiftedTag}> (подъёмная)</span>}
      </td>

      <td className={clsx(styles.data, getStatusClass())}>
        {actualLoad.toFixed(2)} из {maxLoad.toFixed(1)} т.
      </td>
    </tr>
  );
};
