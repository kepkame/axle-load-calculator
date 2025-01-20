import React from 'react';
import { Logo } from '@layouts/Header/Logo';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Logo />

          <div className={styles.buttons}>
            <button>Солнце</button>
            <button>Фура</button>
          </div>
        </div>
      </div>
    </header>
  );
};
