import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchemaType } from '@entities/step2Form/types';

// Defines the initial empty form data for Step 2
const emptyFormData: FormSchemaType = {
  cargoGroup: [{ palletId: 'EUR', weight: 1, quantity: 1 }],
};

export interface Step2FormState {
  formData: FormSchemaType; // Stores cargo groups and their parameters
  isFilled: boolean; // Indicates whether the form has been successfully completed
}

const initialState: Step2FormState = {
  formData: emptyFormData,
  isFilled: false,
};

const step2FormSlice = createSlice({
  name: 'step2Form',
  initialState,
  reducers: {
    /** Replaces current form data with submitted values */
    saveFormData(state, action: PayloadAction<FormSchemaType>) {
      state.formData = action.payload;
    },

    /** Flags the form as filled after successful submission */
    markFormFilled(state) {
      state.isFilled = true;
    },

    /** Resets form state to initial empty values */
    resetFormData(state) {
      state.formData = emptyFormData;
      state.isFilled = false;
    },
  },
});

export const { saveFormData, markFormFilled, resetFormData } = step2FormSlice.actions;
export default step2FormSlice.reducer;
