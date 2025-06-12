import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getEmptyFormData } from '@entities/step1Form/defaultValues';
import type { AxleLoadDataItem, FormSchemaType } from '@entities/step1Form/types';

export interface WheelbaseCache {
  truck: number[];
  trailer: number[];
}

export interface Step1FormState {
  formData: FormSchemaType;
  isFilled: boolean;
  initialized: boolean;
  wheelbaseCache: WheelbaseCache;
  axleCache: Record<string, AxleLoadDataItem>;
}

const initialState: Step1FormState = {
  formData: getEmptyFormData(),
  isFilled: false,
  initialized: false,
  wheelbaseCache: {
    truck: [],
    trailer: [],
  },
  axleCache: {},
};

const step1FormSlice = createSlice({
  name: 'step1Form',
  initialState,
  reducers: {
    /** Initializes the form with default data only once */
    initFormData(state) {
      if (!state.initialized) {
        state.formData = getEmptyFormData();
        state.initialized = true;
      }
    },
    /** Replaces current form data with submitted values */
    saveFormData(state, action: PayloadAction<FormSchemaType>) {
      state.formData = action.payload;
    },
    /** Flags the form as filled after successful submission */
    markFormFilled(state) {
      state.isFilled = true;
    },
    /** Persists axle config per axleId (used in FieldArray reconstruction) */
    setAxleCache(state, action: PayloadAction<AxleLoadDataItem[]>) {
      action.payload.forEach((item) => {
        state.axleCache[item.axleId] = item;
      });
    },
    /** Replaces entire wheelbase cache (both truck and trailer) */
    setWheelbaseCache(state, action: PayloadAction<WheelbaseCache>) {
      state.wheelbaseCache = action.payload;
    },
    /** Updates either truck or trailer wheelbase values independently */
    updateWheelbaseCachePartial(
      state,
      action: PayloadAction<{ type: 'truck' | 'trailer'; values: number[] }>,
    ) {
      state.wheelbaseCache[action.payload.type] = action.payload.values;
    },
    /** Clears the form but keeps initialization flag to avoid re-init on mount */
    resetFormData(state) {
      state.formData = getEmptyFormData();
      state.isFilled = false;
      state.initialized = true;
    },
    resetAxleCache(state) {
      state.axleCache = {};
    },
    resetWheelbaseCache(state) {
      state.wheelbaseCache = { truck: [], trailer: [] };
    },
  },
});

export const {
  initFormData,
  saveFormData,
  markFormFilled,
  setAxleCache,
  setWheelbaseCache,
  updateWheelbaseCachePartial,
  resetFormData,
  resetAxleCache,
  resetWheelbaseCache,
} = step1FormSlice.actions;
export default step1FormSlice.reducer;
