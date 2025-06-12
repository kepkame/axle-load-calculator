import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWatch, Control, UseFormSetValue } from 'react-hook-form';
import { updateWheelbaseCachePartial } from '@store/slices/step1FormSlice/step1FormSlice';
import { selectStep1FormWheelbaseCache } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { FormSchemaType } from '@entities/step1Form/types';

/**
 * Keeps wheelbase values in sync between form state and Redux cache.
 *
 * - Pushes trimmed/padded values to Redux when axle count changes.
 * - Restores cached values on initial load (e.g. when navigating back to Step1).
 */
export const useWheelbaseReduxSync = (
  control: Control<FormSchemaType>,
  setValue: UseFormSetValue<FormSchemaType>,
) => {
  const dispatch = useDispatch();

  const { truck, trailer } = useSelector(selectStep1FormWheelbaseCache);

  const truckAxles = useWatch({ control, name: 'truckAxles' });
  const trailerAxles = useWatch({ control, name: 'trailerAxles' });

  const truckWheelbase = useWatch({ control, name: 'truckWheelbase' }) ?? [];
  const trailerWheelbase = useWatch({ control, name: 'trailerWheelbase' }) ?? [];

  useEffect(() => {
    const count = Number(truckAxles) - 1;
    const corrected = [...truckWheelbase.slice(0, count)];

    // Ensure the array is always the expected length
    while (corrected.length < count) corrected.push(0);

    dispatch(updateWheelbaseCachePartial({ type: 'truck', values: corrected }));
    setValue('truckWheelbase', corrected);
  }, [truckAxles]);

  useEffect(() => {
    const count = Number(trailerAxles) - 1;
    const corrected = [...trailerWheelbase.slice(0, count)];

    while (corrected.length < count) corrected.push(0);

    dispatch(updateWheelbaseCachePartial({ type: 'trailer', values: corrected }));
    setValue('trailerWheelbase', corrected);
  }, [trailerAxles]);

  useEffect(() => {
    // On first mount, restore values from Redux if available
    if (truck.length > 0) setValue('truckWheelbase', truck);
    if (trailer.length > 0) setValue('trailerWheelbase', trailer);
  }, []);
};
