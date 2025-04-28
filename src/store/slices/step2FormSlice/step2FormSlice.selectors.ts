import { RootState } from '../../rootReducer';

export const selectStep2FormData = (state: RootState) => state.step2Form.formData;
export const selectStep2FormFilled = (state: RootState) => state.step2Form.isFilled;
