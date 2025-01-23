import React from 'react';
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
  const baseClass = styles.button;
  const variantClass = isOutline ? styles['outlined'] : '';
  const sizeClass = isSmall ? styles.small : '';
  const iconOnlyClass = Icon && !children ? styles.iconOnly : '';
  const statusClass = status ? styles[`status-${status}`] : '';
  const classes = `
    ${baseClass}
    ${variantClass}
    ${sizeClass}
    ${iconOnlyClass}
    ${statusClass}
    ${className || ''}`.trim();

  return (
    <button className={classes} onClick={onClick} {...props}>
      {Icon && !iconPositionRight && <Icon className={styles.icon} />}
      {children && <span className={styles.text}>{children}</span>}
      {Icon && iconPositionRight && <Icon className={`${styles.icon} ${styles.iconRight}`} />}
    </button>
  );
};
