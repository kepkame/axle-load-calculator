import { RootState } from '../../rootReducer';

export const selectAxleRows = (state: RootState) => state.step3Form.rows;
export const selectAxleLoading = (state: RootState) => state.step3Form.loading;
export const selectAxleError = (state: RootState) => state.step3Form.error;
