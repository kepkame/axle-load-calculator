import React from 'react';
import { PageHeader } from '@components/ui/PageHeader';
import { StepIndicator } from '@components/ui/StepIndicator/StepIndicator';
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
