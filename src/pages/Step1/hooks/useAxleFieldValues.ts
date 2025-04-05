import { useWatch, Control } from 'react-hook-form';
import { FormSchemaType } from '../TransportForm.types';

interface UseAxleFieldValuesResult {
  truckAxlesRaw: number;
  trailerAxlesRaw: number;
}

/**
 * Custom hook for getting the current values of the axis fields:
 * - truckAxles (possibly with a fractional part, e.g. 2.5)
 * - trailerAxles (integer)
 *
 * Returns numeric values ready to be passed to syncAxleFields.
 */
export const useAxleFieldValues = (control: Control<FormSchemaType>): UseAxleFieldValuesResult => {
  const truckAxles = useWatch({ control, name: 'truckAxles' });
  const trailerAxles = useWatch({ control, name: 'trailerAxles' });

  const truckAxlesRaw = Number(truckAxles);
  const trailerAxlesRaw = Number(trailerAxles);

  return { truckAxlesRaw, trailerAxlesRaw };
};
