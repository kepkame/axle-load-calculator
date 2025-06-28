import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWatch, Control, UseFormSetValue } from 'react-hook-form';
import { updateWheelbaseCachePartial } from '@store/slices/step1FormSlice/step1FormSlice';
import type { FormSchemaType } from '@entities/step1Form/types';
import {
  DEFAULT_TRAILER_WHEELBASE_METERS,
  DEFAULT_TRUCK_WHEELBASE_METERS,
} from '../constants/wheelbaseDefaults';
import { arraysDiffer } from '../utils/arraysDiffer';

interface WheelbaseCache {
  truck: number[];
  trailer: number[];
}

interface UseWheelbaseArraySyncParams {
  truckAxlesRaw: number;
  trailerAxlesRaw: number;
  setValue: UseFormSetValue<FormSchemaType>;
  control: Control<FormSchemaType>;
  wheelbaseCache: WheelbaseCache;
}

/**
 * Bidirectional sync between wheelbase arrays in form state and cached values in Redux.
 * - Propagates manual changes from form → cache.
 * - When axle count changes, repopulates form from cache (with fallback to defaults).
 *
 * Designed to ensure a stable user experience when switching axle counts,
 * minimizing surprises and restoring previous values where possible.
 */
export const useWheelbaseArraySync = ({
  truckAxlesRaw,
  trailerAxlesRaw,
  setValue,
  control,
  wheelbaseCache,
}: UseWheelbaseArraySyncParams) => {
  const dispatch = useDispatch();

  // Watch for direct user input in the form fields
  const formTruckWheelbase = useWatch({ control, name: 'truckWheelbase' }) ?? [];
  const formTrailerWheelbase = useWatch({ control, name: 'trailerWheelbase' }) ?? [];

  // Sync from Form state TO Redux Cache (Non-destructive)
  useEffect(() => {
    // Create a new cache array based on the old one to avoid truncation
    const newCache = [...wheelbaseCache.truck];
    let hasChanges = false;

    // Update cache with values from the form
    formTruckWheelbase.forEach((value, index) => {
      if (newCache[index] !== value) {
        newCache[index] = value;
        hasChanges = true;
      }
    });

    // Dispatch only if there are actual changes to prevent unnecessary re-renders
    if (hasChanges) {
      dispatch(updateWheelbaseCachePartial({ type: 'truck', values: newCache }));
    }
  }, [formTruckWheelbase, wheelbaseCache.truck, dispatch]);

  useEffect(() => {
    const newCache = [...wheelbaseCache.trailer];
    let hasChanges = false;

    formTrailerWheelbase.forEach((value, index) => {
      if (newCache[index] !== value) {
        newCache[index] = value;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      dispatch(updateWheelbaseCachePartial({ type: 'trailer', values: newCache }));
    }
  }, [formTrailerWheelbase, wheelbaseCache.trailer, dispatch]);

  // Sync from Axle Count change TO Form state
  useEffect(() => {
    const targetLength = Math.max(0, truckAxlesRaw - 1);

    // Reconstruct the array for the form
    const newFormArray = Array.from({ length: targetLength }, (_, i) => {
      // Prioritize cached value, otherwise use default
      return wheelbaseCache.truck[i] ?? DEFAULT_TRUCK_WHEELBASE_METERS;
    });

    // Update form state only if the newly constructed array differs from the current one
    if (arraysDiffer(formTruckWheelbase, newFormArray)) {
      setValue('truckWheelbase', newFormArray, { shouldValidate: true });
    }
  }, [truckAxlesRaw, wheelbaseCache.truck, setValue]);

  useEffect(() => {
    const targetLength = Math.max(0, trailerAxlesRaw - 1);

    const newFormArray = Array.from({ length: targetLength }, (_, i) => {
      return wheelbaseCache.trailer[i] ?? DEFAULT_TRAILER_WHEELBASE_METERS;
    });

    if (arraysDiffer(formTrailerWheelbase, newFormArray)) {
      setValue('trailerWheelbase', newFormArray, { shouldValidate: true });
    }
  }, [trailerAxlesRaw, wheelbaseCache.trailer, setValue]);
};
