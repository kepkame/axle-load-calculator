import type { Step1FormApiPayload } from '@entities/step1Form/types';
import { createVisualizationModelFromRows } from '../TruckAxleVisualizer/adapters';
import { TruckVisualizer } from '../TruckVisualizer/TruckVisualizer';
import { createVisualizationModel } from '../TruckVisualizer/adapters';
import type { ReduxTruckVisualizerProps } from './ReduxTruckVisualizer.types';

/**
 * Renders axle layout using merged API-calculated results from Redux.
 */
export const ReduxTruckVisualizer: React.FC<ReduxTruckVisualizerProps> = ({
  truckAxles,
  trailerAxles,
  rows,
  loading,
  formData,
}) => {
  // Casts to API-ready payload type for temporary model creation
  const payload: Step1FormApiPayload = {
    truckAxles,
    trailerAxles,
    axleLoadData:
      formData.axleLoadData?.map((item) => ({
        axleType: item.axleType || 'truck', // fallback for undefined
        axleLoadEmpty: item.axleLoadEmpty,
        axleLoadLimit: item.axleLoadLimit,
        lifted: item.lifted ?? false,
      })) ?? [],
  };

  // Builds loading model if data is not yet ready
  const model = loading
    ? createVisualizationModel(payload).axles.map((axle) => ({
        ...axle,
        status: undefined,
      }))
    : null;

  // Uses loading model or API results
  const finalModel = loading
    ? {
        tractorAxles: parseFloat(truckAxles),
        trailerAxles: parseInt(trailerAxles, 10),
        axles: model ?? [],
      }
    : createVisualizationModelFromRows({ truckAxles, trailerAxles, rows });

  return <TruckVisualizer model={finalModel} />;
};
