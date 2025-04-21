import { RootState } from '../../rootReducer';

/**
 * Возвращает все данные формы второго шага (группы паллет)
 */
export const selectStep2FormData = (state: RootState) => state.step2Form.formData;

/**
 * Возвращает флаг, указывающий, была ли форма успешно заполнена
 */
export const selectStep2FormFilled = (state: RootState) => state.step2Form.isFilled;
