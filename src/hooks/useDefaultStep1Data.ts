import { useGetDefaultStep1Query } from '@store/api/apiSlice';
import { getEmptyFormData } from '@entities/step1Form/defaultValues';
import { FormSchemaType } from '@entities/step1Form/types';

interface UseStep1FormStateResult {
  defaultValues: FormSchemaType;
  isLoading: boolean;
  hasData: boolean;
}

export const useDefaultStep1Data = (): UseStep1FormStateResult => {
  const { data, isLoading, isSuccess } = useGetDefaultStep1Query();

  return {
    defaultValues: data ?? getEmptyFormData(),
    isLoading,
    hasData: isSuccess && data !== undefined,
  };
};
