import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FormSchemaType } from '@entities/step2Form/types';

export interface Step2FormState {
  draftFormData: FormSchemaType;
  finalFormData: FormSchemaType;
  isFilled: boolean;
}

// Defines the initial empty form data for Step 2
const emptyFormData: FormSchemaType = {
  cargoGroup: [{ groupId: 1, palletId: 'EUR', weight: 100, quantity: 1 }],
};

const initialState: Step2FormState = {
  draftFormData: emptyFormData,
  finalFormData: emptyFormData,
  isFilled: false,
};

const step2FormSlice = createSlice({
  name: 'step2Form',
  initialState,
  reducers: {
    /** Updates the draft form data with user input */
    setDraftData(state, action: PayloadAction<FormSchemaType>) {
      state.draftFormData = action.payload;
    },
    /** Saves the final form data and marks the form as completed */
    saveFinalData(state, action: PayloadAction<FormSchemaType>) {
      state.finalFormData = action.payload;
      state.draftFormData = action.payload;
      state.isFilled = true;
    },
    /** Clears both draft and final form data, marking the form as unfilled */
    resetFormData(state) {
      state.draftFormData = emptyFormData;
      state.finalFormData = emptyFormData;
      state.isFilled = false;
    },
  },
});

export const { setDraftData, saveFinalData, resetFormData } = step2FormSlice.actions;
export default step2FormSlice.reducer;
