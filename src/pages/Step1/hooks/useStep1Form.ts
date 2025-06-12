import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import type { AxleFieldArrayItem, FormSchemaType } from '@entities/step1Form/types';
import { ALLOWED_TRUCK_AXLES, ALLOWED_TRAILER_AXLES } from '@shared-constants/axleCounts';
import { RootState } from '@store/rootReducer';
import {
  selectStep1FormAxleCache,
  selectStep1FormWheelbaseCache,
} from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { prepareWheelbaseDefaults } from '@utils/prepareWheelbaseDefaults';
import {
  DEFAULT_TRUCK_WHEELBASE_METERS,
  DEFAULT_TRAILER_WHEELBASE_METERS,
} from '../constants/wheelbaseDefaults';
import { parseAxleValue } from '../utils/parseAxleValue';
import { usePersistentAxleArray } from './usePersistentAxleArray';
import { useWheelbaseArraySync } from './useWheelbaseArraySync';

interface UseStep1FormParams {
  methods: UseFormReturn<FormSchemaType>;
  isFilled: boolean;
}

/**
 * Wires up the form logic for Step1:
 * - Normalizes axle count inputs
 * - Applies and syncs axle and wheelbase arrays
 * - Integrates with Redux-backed cache for persistence between sessions
 */
export const useStep1Form = ({ methods, isFilled }: UseStep1FormParams) => {
  const { control, watch, setValue } = methods;

  // Pull cached values for axle + wheelbase arrays
  const axleCache = useSelector((state: RootState) => selectStep1FormAxleCache(state));
  const wheelbaseCache = useSelector((state: RootState) => selectStep1FormWheelbaseCache(state));

  const rawTruckAxles = watch('truckAxles');
  const rawTrailerAxles = watch('trailerAxles');

  // Parse raw values into valid numeric axle counts with fallbacks
  const truckAxles = useMemo(() => {
    const parsed = parseAxleValue({
      raw: rawTruckAxles,
      allowed: ALLOWED_TRUCK_AXLES,
      fallback: '2',
    });
    return parsed;
  }, [rawTruckAxles]);

  const trailerAxles = useMemo(() => {
    const parsed = parseAxleValue({
      raw: rawTrailerAxles,
      allowed: ALLOWED_TRAILER_AXLES,
      fallback: '3',
    });
    return parsed;
  }, [rawTrailerAxles]);

  // Generate base wheelbase arrays if nothing exists yet
  const defaultTruckBases = useMemo(() => {
    const result = prepareWheelbaseDefaults(
      Math.max(1, Math.floor(truckAxles) - 1),
      DEFAULT_TRUCK_WHEELBASE_METERS,
    );
    return result;
  }, [truckAxles]);

  const defaultTrailerBases = useMemo(() => {
    const result = prepareWheelbaseDefaults(
      Math.max(1, trailerAxles - 1),
      DEFAULT_TRAILER_WHEELBASE_METERS,
    );
    return result;
  }, [trailerAxles]);

  // Manage "axleLoadData" as a dynamic field array
  const {
    fields: rawFields,
    replace,
    update,
  } = useFieldArray<FormSchemaType, 'axleLoadData'>({
    control,
    name: 'axleLoadData',
  });

  const fields = rawFields as AxleFieldArrayItem[];

  // Sync axle field array with current axle config + cache
  usePersistentAxleArray({
    truckAxles,
    trailerAxles,
    replace,
    axleCache,
    isFilled,
  });

  // Sync wheelbase arrays from cache - form state
  useWheelbaseArraySync({
    truckAxlesRaw: truckAxles,
    trailerAxlesRaw: trailerAxles,
    setValue,
    control,
    wheelbaseCache,
    defaultTruck: defaultTruckBases,
    defaultTrailer: defaultTrailerBases,
  });

  return {
    methods,
    fields,
    update,
    truckAxles,
    trailerAxles,
    axleCache,
  };
};
