import { AXLE_LOAD_DEFAULTS } from '../constants/axleOptions';
import type { AxleLoadDataItem } from '@entities/step1Form/types';

export type PreparedAxleField = AxleLoadDataItem & { key: string };

const createTruckAxle = (index: number): AxleLoadDataItem => {
  const isLeading = index < 2; // First two truck axles use different load defaults
  const config = isLeading ? AXLE_LOAD_DEFAULTS.truckLeading : AXLE_LOAD_DEFAULTS.truckStandard;

  return {
    axleId: `truck-${index}`,
    axleType: 'truck',
    axleLoadEmpty: config.axleLoadEmpty,
    axleLoadLimit: config.axleLoadLimit,
    lifted: false,
  };
};

const createTrailerAxle = (index: number): AxleLoadDataItem => {
  const config = AXLE_LOAD_DEFAULTS.trailerStandard;

  return {
    axleId: `trailer-${index}`,
    axleType: 'trailer',
    axleLoadEmpty: config.axleLoadEmpty,
    axleLoadLimit: config.axleLoadLimit,
    lifted: false,
  };
};

/**
 * Generates an array of axle data based on the raw axle count input.
 *
 * - Truck axles include up to two "leading" axles with higher load limits.
 * - Trailer axles are added with uniform default values.
 *
 * Used to seed or reset the `axleLoadData` field array when axle counts change.
 */
export const prepareAxleFields = (
  truckAxlesRaw: number,
  trailerAxlesRaw: number,
): AxleLoadDataItem[] => {
  const truckAxles = Array.from({ length: truckAxlesRaw }, (_, index) => createTruckAxle(index));

  const trailerAxles = Array.from({ length: trailerAxlesRaw }, (_, index) =>
    createTrailerAxle(index),
  );

  return [...truckAxles, ...trailerAxles];
};
