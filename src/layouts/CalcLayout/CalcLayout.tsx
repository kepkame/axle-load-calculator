import { PageHeader } from '@components/ui/PageHeader';
import { StepIndicator } from '@components/ui/StepIndicator/StepIndicator';
import type { CalcLayoutProps } from './CalcLayout.types';

export const CalcLayout: React.FC<CalcLayoutProps> = ({ children }) => {
  return (
    <>
      <PageHeader title="Калькулятор нагрузки на оси" />
      <StepIndicator />
      {children}
    </>
  );
};
