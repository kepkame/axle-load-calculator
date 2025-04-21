import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchemaType } from '@entities/step2Form/types';

const emptyFormData: FormSchemaType = {
  cargoGroup: [],
};

export interface Step2FormState {
  formData: FormSchemaType;
  isFilled: boolean;
}

const initialState: Step2FormState = {
  formData: emptyFormData,
  isFilled: false,
};

const step2FormSlice = createSlice({
  name: 'step2Form',
  initialState,
  reducers: {
    saveFormData(state, action: PayloadAction<FormSchemaType>) {
      state.formData = action.payload;
    },

    markFormFilled(state) {
      state.isFilled = true;
    },

    resetFormData(state) {
      state.formData = emptyFormData;
      state.isFilled = false;
    },
  },
});

export const { saveFormData, markFormFilled, resetFormData } = step2FormSlice.actions;
export default step2FormSlice.reducer;
