import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@api/client';
import { mergeAxleFormAndCalcData } from '@pages/Step3/utils/mergeAxleFormAndCalcData';
import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type { RootState } from '../../rootReducer';

interface Step3State {
  rows: LoadStatusRow[];
  loading: boolean;
  error: string | null;
}

const initialState: Step3State = {
  rows: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch axle load results from the API
 * and merge them with form data from Step 1.
 */
export const fetchAxleLoads = createAsyncThunk<
  LoadStatusRow[],
  void,
  { state: RootState; rejectValue: string }
>('step3Form/fetchAxleLoads', async (_, { getState, rejectWithValue }) => {
  try {
    const { step1Form } = getState();
    const formData = step1Form.formData;
    // const cargoData = state.step2Form.formData;
    const response = await api.get('/result');
    const apiData = response.data;

    // Combines API results with form data for rendering
    const merged = mergeAxleFormAndCalcData(formData, apiData);

    return merged;
  } catch (error) {
    if (error instanceof Error) {
      console.error('AxleLoad loading error:', error.message);
    } else {
      console.error('Unknown axleLoad error:', error);
    }

    // Return a typed rejection for Redux state handling
    return rejectWithValue('Error loading data from the server');
  }
});

/**
 * Slice for managing Step 3 result state (axle load calculation results).
 *
 * Handles data fetching, loading state, error tracking, and clearing logic.
 */
const step3FormSlice = createSlice({
  name: 'step3Form',
  initialState,
  reducers: {
    // Resets slice state to initial empty values
    clearStep3(state) {
      state.rows = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sets loading state before fetch starts
      .addCase(fetchAxleLoads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Stores merged axle data on success
      .addCase(fetchAxleLoads.fulfilled, (state, action: PayloadAction<LoadStatusRow[]>) => {
        state.loading = false;
        state.rows = action.payload;
      })
      // Handles fetch error and stores message
      .addCase(fetchAxleLoads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Fetch failed';
      });
  },
});

export default step3FormSlice.reducer;
