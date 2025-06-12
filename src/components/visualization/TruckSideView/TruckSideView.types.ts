import type { TruckAxleCount } from '@shared-constants/axleCounts';
import type { AxleVisualizationModel, AxleStatus } from '../TruckVisualizer/models';

/**
 * Props for the full truck side view visualization.
 * Accepts an array of axle objects (both tractor and trailer).
 */
export interface TruckSideViewProps {
  axles: AxleVisualizationModel[];
}

/**
 * Props for individual axle renderer (tractor or trailer).
 */
export interface AxlesProps {
  axleCount: TruckAxleCount;
  statuses: AxleStatus[];
}
