import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useWatch, Control } from 'react-hook-form';
import type { FormSchemaType, FormContext } from '@entities/step1Form/types';
import {
  DEFAULT_TRAILER_WHEELBASE_METERS,
  DEFAULT_TRUCK_WHEELBASE_METERS,
} from '../constants/wheelbaseDefaults';
import { syncWheelbaseCache } from '../utils/syncWheelbaseCache';

interface UseWheelbaseArraySyncParams {
  truckAxlesRaw: number;
  trailerAxlesRaw: number;
  setValue: (
    name: 'truckWheelbase' | 'trailerWheelbase',
    value: number[],
    options?: { shouldValidate: boolean },
  ) => void;
  control: Control<FormSchemaType, FormContext>;
  wheelbaseCache: {
    truck: number[];
    trailer: number[];
  };
  defaultTruck: number[];
  defaultTrailer: number[];
}

// Utility to check if two arrays differ (by length or value)
const arraysDiffer = (a: number[], b: number[]) =>
  a.length !== b.length || a.some((val, i) => val !== b[i]);

export const useWheelbaseArraySync = ({
  truckAxlesRaw,
  trailerAxlesRaw,
  setValue,
  control,
  wheelbaseCache,
  defaultTruck,
  defaultTrailer,
}: UseWheelbaseArraySyncParams) => {
  const dispatch = useDispatch();
  const currentTruck = useWatch({ control, name: 'truckWheelbase' }) ?? [];
  const currentTrailer = useWatch({ control, name: 'trailerWheelbase' }) ?? [];

  const prevAxleCountRef = useRef({ truck: 0, trailer: 0 });

  const targetTruckLength = Math.max(0, Math.floor(truckAxlesRaw) - 1);
  const targetTrailerLength = Math.max(0, trailerAxlesRaw - 1);

  // Cache truck values after every change — so they can be reused later
  useEffect(() => {
    syncWheelbaseCache({
      current: currentTruck,
      defaultValues: defaultTruck,
      prevCache: wheelbaseCache.truck,
      type: 'truck',
      dispatch,
    });
  }, [currentTruck, defaultTruck]);

  // Cache trailer values after every change — ensures consistency across steps
  useEffect(() => {
    syncWheelbaseCache({
      current: currentTrailer,
      defaultValues: defaultTrailer,
      prevCache: wheelbaseCache.trailer,
      type: 'trailer',
      dispatch,
    });
  }, [currentTrailer, defaultTrailer]);

  // Ensure wheelbase array for truck is correct in length and values
  useEffect(() => {
    if (
      targetTruckLength !== prevAxleCountRef.current.truck ||
      arraysDiffer(currentTruck, wheelbaseCache.truck.slice(0, targetTruckLength))
    ) {
      const filled = Array.from({ length: targetTruckLength }, (_, i) => {
        if (i < wheelbaseCache.truck.length && wheelbaseCache.truck[i] !== 0) {
          return wheelbaseCache.truck[i];
        }
        return defaultTruck[i] ?? DEFAULT_TRUCK_WHEELBASE_METERS;
      });

      if (arraysDiffer(currentTruck, filled)) {
        setValue('truckWheelbase', filled, { shouldValidate: true });
      }

      prevAxleCountRef.current.truck = targetTruckLength;
    }
  }, [targetTruckLength, defaultTruck, setValue]);

  // Same logic for trailer wheelbase
  useEffect(() => {
    if (
      targetTrailerLength !== prevAxleCountRef.current.trailer ||
      arraysDiffer(currentTrailer, wheelbaseCache.trailer.slice(0, targetTrailerLength))
    ) {
      const filled = Array.from({ length: targetTrailerLength }, (_, i) => {
        if (i < wheelbaseCache.trailer.length && wheelbaseCache.trailer[i] !== 0) {
          return wheelbaseCache.trailer[i];
        }
        return defaultTrailer[i] ?? DEFAULT_TRAILER_WHEELBASE_METERS;
      });

      if (arraysDiffer(currentTrailer, filled)) {
        setValue('trailerWheelbase', filled, { shouldValidate: true });
      }

      prevAxleCountRef.current.trailer = targetTrailerLength;
    }
  }, [targetTrailerLength, defaultTrailer, setValue]);
};
