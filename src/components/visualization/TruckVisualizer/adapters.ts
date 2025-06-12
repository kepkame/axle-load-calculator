import { Control, useWatch } from 'react-hook-form';
import type { FormSchemaType, FormContext } from '@entities/step1Form/types';
import type { TruckVisualizationModel, AxleLoadInfo } from './models';

/**
 * Adapter hook: watches form state and transforms it into a visualization model.
 *
 * Ensures axle data reflects the current truck/trailer count and strips excess
 * entries to match the user's configuration. Used for live previews in the form UI.
 */
export function useFormVisualizationAdapter(
  control: Control<FormSchemaType, FormContext>,
): TruckVisualizationModel {
  const [truckAxles, trailerAxles, axleLoadData] = useWatch({
    control,
    name: ['truckAxles', 'trailerAxles', 'axleLoadData'],
  });

  const tractorCount = parseInt(truckAxles || '0', 10) || 0;
  const trailerCount = parseInt(trailerAxles || '0', 10) || 0;

  // Transform all axleLoadData entries → AxleLoadInfo[]
  const rawAxles: AxleLoadInfo[] = Array.isArray(axleLoadData)
    ? axleLoadData.map((item) => ({
        axleType: item.axleType as 'truck' | 'trailer',
        loadEmpty: item.axleLoadEmpty,
        loadLimit: item.axleLoadLimit,
        lifted: item.lifted ?? false,
      }))
    : [];

  let truckAxleInfos = rawAxles.filter((a) => a.axleType === 'truck');
  let trailerAxleInfos = rawAxles.filter((a) => a.axleType === 'trailer');

  // Defensive: truncate arrays if more axles exist than form allows
  if (truckAxleInfos.length > tractorCount) {
    truckAxleInfos = truckAxleInfos.slice(0, tractorCount);
  }
  if (trailerAxleInfos.length > trailerCount) {
    trailerAxleInfos = trailerAxleInfos.slice(0, trailerCount);
  }

  const axles = [
    // Truck axles use base index
    ...truckAxleInfos.map((axle, index) => ({
      axleKey: `axle-${index}`,
      axleType: 'truck' as const,
      index,
      lifted: axle.lifted,
    })),
    // Trailer axles use offset index to maintain uniqueness
    ...trailerAxleInfos.map((axle, index) => ({
      axleKey: `axle-${tractorCount + index}`,
      axleType: 'trailer' as const,
      index,
      lifted: axle.lifted,
    })),
  ];

  return {
    tractorAxles: tractorCount,
    trailerAxles: trailerCount,
    axles,
  };
}

/**
 * Static version of the visualization adapter for use outside form context.
 *
 * Accepts raw axle data and counts (e.g., from server or Redux) and formats it
 * for visualization. Ensures consistent structure and indexing.
 */
export function createVisualizationModel(data: {
  truckAxles: string;
  trailerAxles: string;
  axleLoadData?: Array<{
    axleType: 'truck' | 'trailer';
    axleLoadEmpty?: number;
    axleLoadLimit?: number;
    lifted: boolean;
  }>;
}): TruckVisualizationModel {
  const tractorAxleCount = parseInt(data.truckAxles || '2');
  const trailerAxleCount = parseInt(data.trailerAxles || '3', 10);

  // Transforms axle data into a normalized format
  const axleLoadInfo: AxleLoadInfo[] = Array.isArray(data.axleLoadData)
    ? data.axleLoadData.map((item) => ({
        axleType: (item.axleType || 'truck') as 'truck' | 'trailer',
        loadEmpty: item.axleLoadEmpty,
        loadLimit: item.axleLoadLimit,
        lifted: item.lifted,
      }))
    : [];

  return {
    tractorAxles: tractorAxleCount,
    trailerAxles: trailerAxleCount,
    axles: axleLoadInfo.map((axle, index) => ({
      axleKey: `axle-${index}`, // Ensures consistent key for each axle
      axleType: axle.axleType,
      index,
      lifted: axle.lifted,
    })),
  };
}
