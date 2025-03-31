import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stepsRoutes } from './stepsConfig';
import type { StepsState } from './stepsSlice.types';
import { StepsRoute } from './stepsConfig.types';

const initialState: StepsState = {
  steps: stepsRoutes.map((route: StepsRoute, index: number) => ({
    name: route.name,
    status: index === 0 ? 'current' : undefined,
    isValidated: false,
  })),
  currentStepIndex: 0,
};

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
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

    validateStep: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.steps.length) return;

      state.steps[index].status = 'success';
      state.steps[index].isValidated = true;
    },

    markStepDanger: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.steps.length) return;

      state.steps[index].status = 'danger';
    },

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
