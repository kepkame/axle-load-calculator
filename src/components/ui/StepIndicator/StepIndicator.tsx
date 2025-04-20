import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSteps } from '@store/slices/stepsSlice/stepsSlice';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';
import { StepButton } from './StepButton/StepButton';
import type { Step } from '@store/slices/stepsSlice/stepsSlice.types';
import styles from './StepIndicator.module.scss';

export const StepIndicator: React.FC = () => {
  const navigate = useNavigate();
  const steps = useSelector(selectSteps);

  const handleStepClick = (index: number) => {
    const route = stepsRoutes[index];
    if (route) {
      navigate(route.path);
    }
  };

  return (
    <div className={styles.stepIndicator}>
      {steps.map((step: Step, index: number) => (
        <StepButton
          key={index}
          index={index}
          step={index + 1}
          name={step.name}
          onClick={() => handleStepClick(index)}
        />
      ))}
    </div>
  );
};
