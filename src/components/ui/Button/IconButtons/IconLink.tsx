import React from 'react';
import { NavLink } from 'react-router-dom';
import { IIconLink } from './IconLink.types.ts';
import styles from './IconLink.module.scss';

export const IconLink: React.FC<IIconLink> = ({ url, icon: Icon, className, ariaLabel }) => {
  const classes = `${styles.button} ${className ? className : ''}`.trim();

  return (
    <NavLink to={`${url}`} aria-label={ariaLabel} className={classes}>
      <Icon className={styles.icon} />
    </NavLink>
  );
};
