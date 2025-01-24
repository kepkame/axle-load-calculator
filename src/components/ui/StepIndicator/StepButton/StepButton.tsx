import React from 'react';
import { IStepButtonProps } from './StepButton.types';
import styles from './StepButton.module.scss';

export const StepButton: React.FC<IStepButtonProps> = ({ step, name, status }) => {
  const classess = `
    ${styles.stepButton}
    ${status ? styles[`stepButton--${status}`] : ''}
  `.trim();

  return (
    <button className={classess} type="button" disabled={!status}>
      <span className={styles.number}>{step}</span>
      <span className={styles.name}>{name}</span>
    </button>
  );
};
