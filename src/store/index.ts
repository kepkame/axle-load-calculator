import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export default configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});
