import { useWatch, Control } from 'react-hook-form';
import type { FormSchemaType, FormContext } from '@entities/step1Form/types';

interface UseAxleFieldValuesResult {
  truckAxlesRaw: number;
  trailerAxlesRaw: number;
}

/**
 * Extracts the current truck and trailer axle counts from form state.
 *
 * Converts values to numbers for use in dynamic field logic (e.g. FieldArray syncing).
 */
export const useAxleFieldValues = (
  control: Control<FormSchemaType, FormContext>,
): UseAxleFieldValuesResult => {
  const truckAxles = useWatch({ control, name: 'truckAxles' });
  const trailerAxles = useWatch({ control, name: 'trailerAxles' });

  const truckAxlesRaw = Number(truckAxles);
  const trailerAxlesRaw = Number(trailerAxles);

  return { truckAxlesRaw, trailerAxlesRaw };
};
