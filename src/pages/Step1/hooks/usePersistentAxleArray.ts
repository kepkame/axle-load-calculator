import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetAxleCache, setAxleCache } from '@store/slices/step1FormSlice/step1FormSlice';
import type { AxleLoadDataItem } from '@entities/step1Form/types';
import { applyAxleArraySync } from '../utils/applyAxleArraySync';

interface Params {
  truckAxles: number;
  trailerAxles: number;
  replace: (arr: AxleLoadDataItem[]) => void;
  axleCache: Record<string, AxleLoadDataItem>;
  isFilled: boolean;
}

/**
 * Synchronizes the axleLoadData FieldArray with the current axle count.
 *
 * Re-applies cached values (weights, lifted status) and ensures array consistency
 * when truck or trailer axle counts change dynamically.
 */
export const usePersistentAxleArray = ({
  truckAxles,
  trailerAxles,
  replace,
  axleCache,
  isFilled,
}: Params) => {
  const dispatch = useDispatch();
  const prevAxleCount = useRef<number>(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      // Prevent running logic on initial mount — avoids double replacement
      hasRun.current = true;
      prevAxleCount.current = truckAxles + trailerAxles;
      return;
    }

    const result = applyAxleArraySync({
      truckAxles,
      trailerAxles,
      axleCache,
      prevAxleCount: prevAxleCount.current,
    });

    if (result.shouldReplace && result.newArray) {
      // Replace current axleLoadData in the form with the new array
      replace(result.newArray);
      // Clear outdated axle data from the Redux cache
      dispatch(resetAxleCache());
      // Store only the currently valid axle items in the Redux cache
      dispatch(setAxleCache(result.newArray));
    }

    prevAxleCount.current = result.newAxleCount;
  }, [truckAxles, trailerAxles, isFilled, replace]);
};
