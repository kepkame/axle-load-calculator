import React from 'react';
import { Logo } from '@layouts/Header/Logo/Logo';
import { ThemeToggle } from '@layouts/Header/ThemeToggle/ThemeToggle';
import { IconLink } from '@components/ui/Button/IconButtons/IconLink';
import IconTruck from '@assets/icons/truck-front.svg?react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Logo />

          <div className={styles.buttons}>
            <ThemeToggle />

            <IconLink
              url="/favorites"
              icon={IconTruck}
              className={styles.buttonSettings}
              ariaLabel="Сохраненные параметры"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
