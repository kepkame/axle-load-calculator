import { combineReducers } from '@reduxjs/toolkit';
import stepsReducer from './slices/stepsSlice/stepsSlice';
import step1FormReducer from './slices/step1FormSlice/step1FormSlice';
import step2FormReducer from './slices/step2FormSlice/step2FormSlice';
import { apiSlice } from './api/apiSlice';

const rootReducer = combineReducers({
  steps: stepsReducer,
  step1Form: step1FormReducer,
  step2Form: step2FormReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
