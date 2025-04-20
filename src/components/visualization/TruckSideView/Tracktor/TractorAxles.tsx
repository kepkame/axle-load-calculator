import { getTractorAxles } from '../renderers/axlesRenderer';
import { AxleLoadStatus, AxlesProps } from '../TruckSideView.types';

export const TractorAxles: React.FC<AxlesProps> = ({
  axleCount = 2,
  status = AxleLoadStatus.Default,
}) => {
  return <g id="tractor-axles">{getTractorAxles(axleCount, status)}</g>;
};
