import React from 'react';
import clsx from 'clsx';
import { IButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({
  onClick,
  isOutline = false,
  isSmall = false,
  icon: Icon,
  iconPositionRight,
  status,
  className,
  children,
  ...props
}) => {
  const classes = clsx(
    styles.button,
    {
      [styles['outlined']]: isOutline,
      [styles.small]: isSmall,
      [styles.iconOnly]: Icon && !children,
      [styles[`status-${status}`]]: status,
    },
    className,
  );

  return (
    <button className={classes} onClick={onClick} {...props}>
      {Icon && !iconPositionRight && <Icon className={styles.icon} />}
      {children && <span className={styles.text}>{children}</span>}
      {Icon && iconPositionRight && <Icon className={`${styles.icon} ${styles.iconRight}`} />}
    </button>
  );
};
