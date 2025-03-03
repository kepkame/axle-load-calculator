import { getTractorAxles } from '../renderers/axlesRenderer';
import { AxleLoadStatus, IAxlesProps } from '../TruckSideView.types';

export const TractorAxles: React.FC<IAxlesProps> = ({
  axleCount = 2,
  status = AxleLoadStatus.Default,
}) => {
  return <g id="tractor-axles">{getTractorAxles(axleCount, status)}</g>;
};
