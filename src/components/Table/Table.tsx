import React from 'react';
import { ITableProps } from './Table.types';
import styles from './Table.module.scss';
import clsx from 'clsx';

export const Table: React.FC<ITableProps> = ({ children, className, ...props }) => {
  return (
    <table className={clsx(styles.table, className)} {...props}>
      {children}
    </table>
  );
};
