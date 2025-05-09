import { TruckSideView } from '@components/visualization/TruckSideView/TruckSideView';
import { TruckVisualizationModel } from './models';

interface TruckVisualizerProps {
  model: TruckVisualizationModel;
}

/**
 * Renders truck and trailer layout using the provided visualization model.
 */
export const TruckVisualizer: React.FC<TruckVisualizerProps> = ({ model }) => {
  return (
    <TruckSideView
      tractorAxleCount={model.tractorAxles}
      trailerAxleCount={model.trailerAxles}
      axles={model.axles}
    />
  );
};
