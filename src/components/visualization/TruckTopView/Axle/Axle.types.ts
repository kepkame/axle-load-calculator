import type { AxleStatus } from '@shared-types/loadStatus';

export interface AxleProps {
  yPx: number;
  isLifted: boolean;
  status: AxleStatus;
  wheelHeightPx: number;
  isLoading: boolean;
}
