import { AxleVisualizationModel, AxleStatus } from '../TruckVisualizer/models';

// Allowed discrete values for tractor and trailer axle count
export type TractorAxleCount = 2 | 2.5 | 3;
export type TrailerAxleCount = 2 | 3 | 4;

export interface TruckSideViewProps {
  tractorAxleCount?: number;
  trailerAxleCount?: number;
  axles: AxleVisualizationModel[];
}

export interface AxlesProps {
  axleCount?: number;
  statuses: AxleStatus[];
}
