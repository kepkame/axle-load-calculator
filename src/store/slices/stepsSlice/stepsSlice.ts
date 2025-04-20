import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stepsRoutes } from './stepsConfig';
import type { StepsState } from './stepsSlice.types';
import { StepsRoute } from './stepsConfig.types';

// Initializes steps from config and marks the first one as active
const initialState: StepsState = {
  steps: stepsRoutes.map((route: StepsRoute, index: number) => ({
    name: route.name,
    status: index === 0 ? 'current' : undefined,
    isValidated: false,
  })),
  currentStepIndex: 0,
};

/**
 * Redux slice for controlling navigation and validation status
 * of a multi-step flow. Enforces linear navigation and validation rules.
 */
const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    /**
     * Changes the current step if all prior steps are validated.
     * Also updates step status based on validation state.
     */
    navigateToStep: (state, action: PayloadAction<number>) => {
      const targetIndex = action.payload;

      // Prevent navigation outside valid step range
      if (targetIndex < 0 || targetIndex >= state.steps.length) return;

      if (targetIndex > state.currentStepIndex) {
        const allPreviousValid = state.steps
          .slice(0, targetIndex)
          .every((step) => step.isValidated);
        if (!allPreviousValid) return;
      }

      const prevIndex = state.currentStepIndex;
      const prevStep = state.steps[prevIndex];
      if (prevStep.status === 'current') {
        prevStep.status = prevStep.isValidated ? 'success' : 'visited';
      }

      state.steps.forEach((step, i) => {
        if (i !== targetIndex && step.status === 'current') {
          step.status = step.isValidated ? 'success' : 'visited';
        }
      });

      state.steps[targetIndex].status = 'current';
      state.currentStepIndex = targetIndex;
    },

    /**
     * Marks the given step as validated and updates its status to 'success'.
     */
    validateStep: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.steps.length) return;

      state.steps[index].status = 'success';
      state.steps[index].isValidated = true;
    },

    /**
     * Flags a step as having an issue (e.g. validation failure).
     */
    markStepDanger: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.steps.length) return;

      state.steps[index].status = 'danger';
    },

    /**
     * Resets validation and status for all steps after the given index.
     */
    resetStepsAfter: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      // Clear status and validation from all steps after the given index
      for (let i = index + 1; i < state.steps.length; i++) {
        state.steps[i].status = undefined;
        state.steps[i].isValidated = false;
      }
    },
  },
});

export const { navigateToStep, validateStep, markStepDanger, resetStepsAfter } = stepsSlice.actions;

export const selectSteps = (state: { steps: StepsState }) => state.steps.steps;
export const selectCurrentStepIndex = (state: { steps: StepsState }) =>
  state.steps.currentStepIndex;
export const selectStepStatus = (index: number) => (state: { steps: StepsState }) =>
  state.steps.steps[index]?.status;
export const selectStepValidated = (index: number) => (state: { steps: StepsState }) =>
  state.steps.steps[index]?.isValidated;

export default stepsSlice.reducer;
