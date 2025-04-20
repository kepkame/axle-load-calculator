import { FormSchemaType } from '@entities/step1Form/types';
import { useDefaultStep1Data } from '@hooks/useDefaultStep1Data';
import { ALLOWED_TRUCK_AXLES, ALLOWED_TRAILER_AXLES } from '../constants/axleOptions';
import { prepareAxleFields } from '../utils/prepareAxleFields';
import { parseAxleValue } from '../utils/parseAxleValue';

interface UsePreparedStep1FormResult {
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  refetch: () => Promise<void>;
  defaultValues: FormSchemaType;
}

/**
 * Enhances the default Step1 form data by parsing axle counts
 * and generating a matching axleLoadData array.
 * Returns enriched values ready for form initialization. base: UseStep1FormStateResult
 */
export const usePreparedStep1Form = (): UsePreparedStep1FormResult => {
  const base = useDefaultStep1Data();

  // Parsing string values of axes
  const truckAxlesParsed = parseAxleValue({
    raw: base.defaultValues.truckAxles,
    allowed: ALLOWED_TRUCK_AXLES,
    fallback: 2,
  });

  const trailerAxlesParsed = parseAxleValue({
    raw: base.defaultValues.trailerAxles,
    allowed: ALLOWED_TRAILER_AXLES,
    fallback: 3,
  });

  // Generate a valid axes array
  const axleLoadData = prepareAxleFields(truckAxlesParsed, trailerAxlesParsed);

  // Create a new defaultValues object with computed axleLoadData
  const enhancedDefaultValues: FormSchemaType = {
    ...base.defaultValues,
    axleLoadData,
  };

  return {
    ...base,
    defaultValues: enhancedDefaultValues,
  };
};
