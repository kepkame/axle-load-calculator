import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { Header } from '@layouts/Header/Header';
import { PageHeader } from '@components/ui/PageHeader';
import { StepIndicator } from '@components/ui/StepIndicator/StepIndicator';
// import { Footer } from '@layouts/Footer/Footer';
import { ICalcLayoutProps } from './CalcLayout.types';

export const CalcLayout: React.FC<ICalcLayoutProps> = ({ children }) => {
  return (
    <>
      <PageHeader title="Калькулятор нагрузки на оси" />
      <StepIndicator />
      {children}
    </>
  );
};
