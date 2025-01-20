import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@layouts/Header';
import { Footer } from '@layouts/Footer';

import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
