import { getTrailerAxles } from '../renderers/axlesRenderer';
import { AxleLoadStatus, AxlesProps } from '../TruckSideView.types';

export const TrailerAxles: React.FC<AxlesProps> = ({
  axleCount = 3,
  status = AxleLoadStatus.Default,
}) => {
  return <g id="tractor-axles">{getTrailerAxles(axleCount, status)}</g>;
};
