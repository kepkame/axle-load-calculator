import { TruckTopViewProps } from '../TruckTopView.types';

export interface TractorProps extends TruckTopViewProps {
  pxPerMm: number;
  trailerLengthPx: number;
  wheelHeightPx: number;
  isLoading: boolean;
}
