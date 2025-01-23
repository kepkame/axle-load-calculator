import React from 'react';
import { IIconButton } from './IconButton.types';
import styles from './IconButton.module.scss';

export const IconButton: React.FC<IIconButton> = ({
  onClick,
  icon: Icon,
  ariaLabel,
  className,
  isRemove,
  type,
}) => {
  const classes = `${styles.button} ${className} ${isRemove ? styles.remove : ''}`.trim();

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${styles.button} ${classes}`}
      type={type ? type : 'button'}
    >
      <Icon className={styles.icon} />
    </button>
  );
};
