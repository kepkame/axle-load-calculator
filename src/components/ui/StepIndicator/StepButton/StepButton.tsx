import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectSteps, selectStepStatus } from '@store/slices/stepsSlice/stepsSlice';
import { IStepButtonProps } from './StepButton.types';
import { isStepClickable } from './StepButton.utils';
import styles from './StepButton.module.scss';

export const StepButton: React.FC<IStepButtonProps> = ({ index, name, step, onClick }) => {
  const steps = useSelector(selectSteps);
  const status = useSelector(selectStepStatus(index));
  const isClickable = isStepClickable(index, steps);
  const className = clsx(styles.stepButton, status && styles[`stepButton--${status}`]);

  return (
    <button className={className} onClick={onClick} disabled={!isClickable} type="button">
      {step && <span className={styles.number}>{step}</span>}
      <span className={styles.name}>{name}</span>
    </button>
  );
};
