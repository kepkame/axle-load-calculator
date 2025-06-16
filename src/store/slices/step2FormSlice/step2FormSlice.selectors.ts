import { RootState } from '../../rootReducer';

export const selectStep2DraftData = (state: RootState) => state.step2Form.draftFormData;
export const selectStep2FinalData = (state: RootState) => state.step2Form.finalFormData;
export const selectStep2FormFilled = (state: RootState) => state.step2Form.isFilled;
