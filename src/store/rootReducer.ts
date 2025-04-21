import { combineReducers } from '@reduxjs/toolkit';
import stepsReducer from './slices/stepsSlice/stepsSlice';
import step1FormReducer from './slices/step1FormSlice/step1FormSlice';
import step2FormReducer from './slices/step2FormSlice/step2FormSlice';

const rootReducer = combineReducers({
  steps: stepsReducer,
  step1Form: step1FormReducer,
  step2Form: step2FormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
