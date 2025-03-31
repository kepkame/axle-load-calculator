import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateToStep, selectCurrentStepIndex } from '@store/slices/stepsSlice/stepsSlice';

export const useStepSync = (stepIndex: number) => {
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(selectCurrentStepIndex);

  useEffect(() => {
    if (currentStepIndex !== stepIndex) {
      dispatch(navigateToStep(stepIndex));
    }
  }, [dispatch, stepIndex, currentStepIndex]);
};
