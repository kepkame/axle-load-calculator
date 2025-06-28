import { getAxleStatus } from '@utils/getLoadStatus';
import styles from '../LoadStatusTable.module.scss';

/**
 * Maps load ratio (actual vs. max) to a CSS class for table cell coloring.
 *
 * Returns empty string if status is not visually representable.
 */
export const getStatusClass = (actualLoad: number, maxLoad: number): string => {
  const status = getAxleStatus(actualLoad, maxLoad);

  switch (status) {
    case 'success':
      return styles.dataSuccess;
    case 'warning':
      return styles.dataWarning;
    case 'danger':
      return styles.dataDanger;
    default:
      return '';
  }
};
