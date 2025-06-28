import { TruckSideView } from '../TruckSideView/TruckSideView';
import type { TruckVisualizerProps } from './models';

/**
 * Renders truck and trailer layout using the provided visualization model.
 */
export const TruckVisualizer: React.FC<TruckVisualizerProps> = ({ model }) => {
  return <TruckSideView axles={model.axles} />;
};
