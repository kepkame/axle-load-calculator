import { ForwardedRef } from 'react';
import type { AxleCoord, TruckTopViewProps } from '../TruckTopView.types';

export interface TrailerProps extends TruckTopViewProps {
  trailerWrapperRef: ForwardedRef<HTMLDivElement>;
  pxPerMm: number;
  trailerLengthPx: number;
  wheelHeightPx: number;
  axlesForRows: AxleCoord[];
  isLoading: boolean;
}
