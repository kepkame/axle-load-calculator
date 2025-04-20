import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { IconLinkProps } from './IconLink.types.ts';
import styles from './IconLink.module.scss';

export const IconLink: React.FC<IconLinkProps> = ({
  url,
  icon: Icon,
  className,
  ariaLabel,
  openInNewTab,
}) => {
  const classes = clsx(styles.button, className);

  return (
    <NavLink
      to={`${url}`}
      aria-label={ariaLabel}
      className={classes}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      <Icon className={styles.icon} />
    </NavLink>
  );
};
