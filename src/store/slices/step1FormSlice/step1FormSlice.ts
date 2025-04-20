import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchemaType } from '@entities/step1Form/types';
import { getEmptyFormData } from '@entities/step1Form/defaultValues';

// Defines the slice state for Step 1 form
export interface Step1FormState {
  formData: FormSchemaType; // Stores current values of the form
  isFilled: boolean; // Indicates whether the form has been successfully filled
}

const initialState: Step1FormState = {
  formData: getEmptyFormData(),
  isFilled: false,
};

/**
 * Allows saving form data, marking it as filled, and resetting
 */
const step1FormSlice = createSlice({
  name: 'step1Form',
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
      state.formData = getEmptyFormData();
      state.isFilled = false;
    },
  },
});

export const { saveFormData, markFormFilled, resetFormData } = step1FormSlice.actions;
export default step1FormSlice.reducer;
