import clsx from 'clsx';
import IconInfo from '@assets/icons/info-fill.svg?react';
import { Logo } from '@layouts/Header/Logo/Logo';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Logo />

          <div className={styles.buttons}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                clsx('btn', 'btn--outline', 'btn--icon', 'btn--small', styles.navLink, {
                  [styles.active]: isActive,
                })
              }
            >
              <IconInfo className={clsx('icon', styles.icon)} />О проекте
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
