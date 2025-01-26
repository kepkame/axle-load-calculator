import React from 'react';
import { StepButton } from './StepButton/StepButton';
import { IStepIndicatorProps } from './StepIndicator.types';
import { IStepButtonProps } from './StepButton/StepButton.types';
import styles from './StepIndicator.module.scss';

export const StepIndicator: React.FC<IStepIndicatorProps> = ({ steps }) => {
  return (
    <div className={styles.stepIndicator}>
      {steps.map((obj: IStepButtonProps, index: number) => (
        <StepButton key={index} step={index + 1} name={obj.name} status={obj.status ?? undefined} />
      ))}
    </div>
  );
};
