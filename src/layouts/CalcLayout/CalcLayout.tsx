import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@layouts/Header/Header';
import { PageHeader } from '@components/ui/PageHeader';
import { StepIndicator } from '@components/ui/StepIndicator/StepIndicator';
import { Footer } from '@layouts/Footer/Footer';

import styles from './CalcLayout.module.scss';

export const CalcLayout: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <PageHeader title="Калькулятор нагрузки на оси" />
          <StepIndicator />
          <div className={styles.calculator}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
