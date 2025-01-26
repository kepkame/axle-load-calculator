import React from 'react';
import clsx from 'clsx';
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
  const classes = clsx(styles.button, className, { [styles.remove]: isRemove });

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      type={type ? type : 'button'}
    >
      <Icon className={styles.icon} />
    </button>
  );
};
