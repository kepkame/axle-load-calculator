import { Step } from '@store/slices/stepsSlice/stepsSlice.types';

/**
 * Determines whether a given step in the multi-step flow is clickable.
 *
 * A step is considered clickable only if:
 * - It's the first step (always allowed),
 * - OR the previous step has been validated (`isValidated === true`).
 *
 * This enforces a linear progression where users must complete prior steps
 * before accessing the next one.
 *
 * @param index - Index of the current step.
 * @param steps - Full list of steps from the Redux store.
 * @returns True if the step can be clicked; otherwise, false.
 */
export const isStepClickable = (index: number, steps: Step[]): boolean => {
  if (index === 0) return true;

  const prevStep = steps[index - 1];
  return prevStep?.isValidated === true;
};
