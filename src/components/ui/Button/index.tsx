import React from 'react';
import { IButtonProps } from './index.type';
import styles from './index.module.scss';

export const Button: React.FC<IButtonProps> = ({
  isOutline = false,
  isSmall = false,
  icon: Icon,
  iconPositionRight,
  children,
  status,
  onClick,
  className,
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
