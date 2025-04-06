import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchemaType } from '@entities/step1Form/types';
import { getEmptyFormData } from '@entities/step1Form/defaultValues';

export interface Step1FormState {
  formData: FormSchemaType;
  isFilled: boolean;
}

const initialState: Step1FormState = {
  formData: getEmptyFormData(),
  isFilled: false,
};

const step1FormSlice = createSlice({
  name: 'step1Form',
  initialState,
  reducers: {
    saveFormData(state, action: PayloadAction<FormSchemaType>) {
      state.formData = action.payload;
    },
    markFormFilled(state) {
      state.isFilled = true;
    },
    resetFormData(state) {
      state.formData = getEmptyFormData();
      state.isFilled = false;
    },
  },
});

export const { saveFormData, markFormFilled, resetFormData } = step1FormSlice.actions;
export default step1FormSlice.reducer;
