import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@layouts/Header/Header';
import { Footer } from '@layouts/Footer/Footer';

import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
