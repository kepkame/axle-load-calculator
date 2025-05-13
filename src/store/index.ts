import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './rootReducer';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.DEV,
});

// Typed version of the Redux dispatch function
export type AppDispatch = typeof store.dispatch;

// Custom hook to access typed dispatch in components
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
