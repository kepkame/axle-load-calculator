import { Control, useWatch } from 'react-hook-form';
import { FormSchemaType } from '@entities/step1Form/types';
import { TruckVisualizationModel, AxleLoadInfo } from './models';

/**
 * Maps live form input to a visualization model for rendering.
 */
export function useFormVisualizationAdapter(
  control: Control<FormSchemaType>,
): TruckVisualizationModel {
  // Watches specific fields from the form state
  const [truckAxles, trailerAxles, axleLoadData] = useWatch({
    control,
    name: ['truckAxles', 'trailerAxles', 'axleLoadData'],
  });

  // Parses axle counts from strings with fallbacks
  const tractorAxleCount = parseFloat(truckAxles || '2');
  const trailerAxleCount = parseInt(trailerAxles || '3', 10);

  // Normalizes axle load data into a consistent shape
  const axleLoadInfo: AxleLoadInfo[] = Array.isArray(axleLoadData)
    ? axleLoadData.map((item) => ({
        axleType: item.axleType as 'truck' | 'trailer',
        loadEmpty: item.axleLoadEmpty,
        loadLimit: item.axleLoadLimit,
        lifted: item.lifted,
      }))
    : [];

  return {
    tractorAxles: tractorAxleCount,
    trailerAxles: trailerAxleCount,
    axles: axleLoadInfo.map((axle, index) => ({
      axleKey: `axle-${index}`, // Temporary unique key for rendering
      axleType: axle.axleType,
      index,
      lifted: axle.lifted,
    })),
  };
}

/**
 * Converts serialized form data (e.g., from Redux) to a visualization model.
 */
export function createVisualizationModel(data: {
  truckAxles: string;
  trailerAxles: string;
  axleLoadData?: Array<{
    axleType?: string;
    axleLoadEmpty?: number;
    axleLoadLimit?: number;
    lifted?: boolean;
  }>;
}): TruckVisualizationModel {
  // Parses axle counts from strings with default fallback values
  const tractorAxleCount = parseFloat(data.truckAxles || '2');
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
