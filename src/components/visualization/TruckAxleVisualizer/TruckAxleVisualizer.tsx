import { TruckVisualizer } from '../TruckVisualizer/TruckVisualizer';
import { useFormVisualizationAdapter } from '../TruckVisualizer/adapters';
import { TruckAxleVisualizerProps } from './TruckAxleVisualizer.types';

/**
 * Generates and renders axle layout from live form data.
 */
export const TruckAxleVisualizer: React.FC<TruckAxleVisualizerProps> = ({ control }) => {
  const visualizationModel = useFormVisualizationAdapter(control);

  return <TruckVisualizer model={visualizationModel} />;
};
