import { createAxleGroup } from '../renderers/createAxleGroup';
import type { AxleStatus } from '@shared-types/loadStatus';
import type { TrailerAxleCount, TruckAxleCount } from '@shared-constants/axleCounts';

interface AxlesRendererProps {
  axleCount: TruckAxleCount | TrailerAxleCount;
  axleType: 'truck' | 'trailer';
  statuses: AxleStatus[];
  lifted: boolean[];
}

/**
 * Responsible for rendering axle groups (either truck or trailer)
 * with appropriate SVG paths and status classes.
 */
export const AxlesRenderer: React.FC<AxlesRendererProps> = ({
  axleCount,
  axleType,
  statuses,
  lifted,
}) => {
  const renderedAxles = createAxleGroup(axleCount, axleType, statuses, lifted);

  return <g id={`${axleType}-axles`}>{renderedAxles}</g>;
};
