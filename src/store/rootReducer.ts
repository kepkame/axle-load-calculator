import { combineReducers } from '@reduxjs/toolkit';
import stepsReducer from './slices/stepsSlice/stepsSlice';

const rootReducer = combineReducers({
  steps: stepsReducer,
});

export default rootReducer;
