import { TruckVisualizer } from '../TruckVisualizer/TruckVisualizer';
import { createVisualizationModel } from '../TruckVisualizer/adapters';
import { createVisualizationModelFromRows } from '../TruckAxleVisualizer/adapters';
import { ReduxTruckVisualizerProps } from './ReduxTruckVisualizer.types';

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
  // Builds temporary model with 'loading' status if data is not yet ready
  const model = loading
    ? createVisualizationModel({
        truckAxles,
        trailerAxles,
        axleLoadData: formData.axleLoadData?.map((item) => ({
          axleType: item.axleType,
          axleLoadEmpty: item.axleLoadEmpty,
          axleLoadLimit: item.axleLoadLimit,
          lifted: item.lifted,
        })),
      }).axles.map((axle) => ({
        ...axle,
        status: 'loading' as const,
      }))
    : null;

  // Uses loading model or final model based on state
  const finalModel = loading
    ? {
        tractorAxles: parseFloat(truckAxles),
        trailerAxles: parseFloat(trailerAxles),
        axles: model ?? [],
      }
    : createVisualizationModelFromRows({ truckAxles, trailerAxles, rows });

  return <TruckVisualizer model={finalModel} />;
};
