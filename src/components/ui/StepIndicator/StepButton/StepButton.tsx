import React from 'react';
import clsx from 'clsx';
import { IStepButtonProps } from './StepButton.types';
import styles from './StepButton.module.scss';

export const StepButton: React.FC<IStepButtonProps> = ({ step, name, status }) => {
  const className = clsx(styles.stepButton, { [styles[`stepButton--${status}`]]: !!status });

  return (
    <button className={className} type="button" disabled={!status}>
      <span className={styles.number}>{step}</span>
      <span className={styles.name}>{name}</span>
    </button>
  );
};
