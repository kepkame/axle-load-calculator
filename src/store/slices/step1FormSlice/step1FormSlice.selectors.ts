import { RootState } from '../../rootReducer';

export const selectStep1FormData = (state: RootState) => state.step1Form.formData;
export const selectStep1FormFilled = (state: RootState) => state.step1Form.isFilled;
