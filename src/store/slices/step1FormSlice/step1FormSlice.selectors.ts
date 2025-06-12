import { RootState } from '../../rootReducer';

export const selectStep1FormData = (state: RootState) => state.step1Form.formData;
export const selectStep1FormFilled = (state: RootState) => state.step1Form.isFilled;
export const selectStep1FormInitialized = (state: RootState) => state.step1Form.initialized;
export const selectStep1FormWheelbaseCache = (state: RootState) => state.step1Form.wheelbaseCache;
export const selectStep1FormAxleCache = (state: RootState) => state.step1Form.axleCache;
