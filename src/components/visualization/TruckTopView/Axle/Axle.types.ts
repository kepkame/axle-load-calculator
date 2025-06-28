import type { AxleStatus } from '@components/visualization/TruckVisualizer/models';

export interface AxleProps {
  yPx: number;
  isLifted: boolean;
  status: AxleStatus;
  wheelHeightPx: number;
  isLoading: boolean;
}
