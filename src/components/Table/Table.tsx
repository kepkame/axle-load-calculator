import clsx from 'clsx';
import { TableProps } from './Table.types';
import styles from './Table.module.scss';

/**
 * Generic styled table wrapper.
 */
export const Table: React.FC<TableProps> = ({ children, className, ...props }) => {
  return (
    <table className={clsx(styles.table, className)} {...props}>
      {children}
    </table>
  );
};
