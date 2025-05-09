import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStep1FormData,
  selectStep1FormFilled,
} from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { saveFormData, markFormFilled } from '@store/slices/step1FormSlice/step1FormSlice';
import { fetchDefaultStep1 } from '@api/fetchDefaultStep1';
import { FormSchemaType } from '@entities/step1Form/types';
import { getEmptyFormData } from '@entities/step1Form/defaultValues';
import { normalizeAxlesFromApi } from '../utils/normalizeAxlesFromApi';

interface UseStep1FormStateResult {
  defaultValues: FormSchemaType;
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  refetch: () => Promise<void>;
}

/**
 * Provides initial/default values for the Step1 form.
 * Fetches from API on first load if not already filled in Redux.
 * Ensures axle data is normalized before storing in Redux.
 */
export const useDefaultStep1Data = (): UseStep1FormStateResult => {
  const dispatch = useDispatch();
  const isFilled = useSelector(selectStep1FormFilled); // used to skip unnecessary fetch
  const formData = useSelector(selectStep1FormData);

  const [isLoading, setIsLoading] = useState(!isFilled);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchDefaultStep1();
      const normalized = normalizeAxlesFromApi(data);

      dispatch(saveFormData(normalized));
      dispatch(markFormFilled());
    } catch (error) {
      console.error('Error loading Step1 form data:', error);
      alert('Не удалось загрузить значения формы по умолчанию. Будет использована пустая форма.');
      dispatch(saveFormData(getEmptyFormData()));
      dispatch(markFormFilled());
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Automatically fetch default data if not filled yet
  useEffect(() => {
    if (!isFilled) {
      fetchData();
    }
  }, [isFilled, dispatch]);

  return {
    defaultValues: formData, // Always returns latest Redux form state
    isLoading,
    isError,
    hasData: isFilled, // True if data has been loaded or filled manually
    refetch: fetchData, // Allows to re-trigger fetch
  };
};
