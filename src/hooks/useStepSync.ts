import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateToStep, selectCurrentStepIndex } from '@store/slices/stepsSlice/stepsSlice';

/**
 * Keeps the global stepper state in sync with the current page's step index
 */
export const useStepSync = (stepIndex: number) => {
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(selectCurrentStepIndex);

  useEffect(() => {
    // Updates the stepper if it's out of sync with the expected step
    if (currentStepIndex !== stepIndex) {
      dispatch(navigateToStep(stepIndex));
    }
  }, [dispatch, stepIndex, currentStepIndex]);
};
