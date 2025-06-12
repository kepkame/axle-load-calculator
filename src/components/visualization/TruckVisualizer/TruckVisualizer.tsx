import { TruckSideView } from '@components/visualization/TruckSideView/TruckSideView';
import type { TruckVisualizationModel } from './models';

interface TruckVisualizerProps {
  model: TruckVisualizationModel;
}

/**
 * Renders truck and trailer layout using the provided visualization model.
 */
export const TruckVisualizer: React.FC<TruckVisualizerProps> = ({ model }) => {
  return <TruckSideView axles={model.axles} />;
};
