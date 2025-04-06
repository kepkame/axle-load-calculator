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

interface UseStep1FormStateResult {
  defaultValues: FormSchemaType;
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  refetch: () => Promise<void>;
}

/**
 * Hook that returns the values of the Step1 form.
 * If there is no data in Redux, it loads them from the API and stores them.
 */
export const useDefaultStep1Data = (): UseStep1FormStateResult => {
  const dispatch = useDispatch();
  const isFilled = useSelector(selectStep1FormFilled);
  const formData = useSelector(selectStep1FormData);

  const [isLoading, setIsLoading] = useState(!isFilled);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchDefaultStep1();
      dispatch(saveFormData(data));
      dispatch(markFormFilled());
    } catch (error) {
      console.error('Ошибка при загрузке данных формы Step1:', error);
      alert('Не удалось загрузить значения по умолчанию. Будет использована пустая форма.');
      dispatch(saveFormData(getEmptyFormData()));
      dispatch(markFormFilled());
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isFilled) {
      fetchData();
    }
  }, [isFilled, dispatch]);

  return {
    defaultValues: formData,
    isLoading,
    isError,
    hasData: isFilled,
    refetch: fetchData,
  };
};
