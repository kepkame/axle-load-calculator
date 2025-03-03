import { getTrailerAxles } from '../renderers/axlesRenderer';
import { AxleLoadStatus, IAxlesProps } from '../TruckSideView.types';

export const TrailerAxles: React.FC<IAxlesProps> = ({
  axleCount = 3,
  status = AxleLoadStatus.Default,
}) => {
  return <g id="tractor-axles">{getTrailerAxles(axleCount, status)}</g>;
};
