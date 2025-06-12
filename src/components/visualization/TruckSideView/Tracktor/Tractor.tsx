import type { AxleStatus } from '@components/visualization/TruckVisualizer/models';
import type { TruckAxleCount } from '@shared-constants/axleCounts';
import { AxlesRenderer } from '../AxlesRenderer/AxlesRenderer';
import { TractorCab } from './TractorCab';
import { TractorPlatform } from './TractorPlatform';

interface TractorProps {
  axleCount: TruckAxleCount;
  statuses: AxleStatus[];
  lifted: boolean[];
}

/** Renders the tractor section with cab, platform, and axle visuals */
export const Tractor: React.FC<TractorProps> = ({ axleCount, statuses, lifted }) => {
  return (
    <>
      <TractorCab />
      <TractorPlatform axleCount={axleCount} />
      <AxlesRenderer axleCount={axleCount} axleType="truck" statuses={statuses} lifted={lifted} />
    </>
  );
};
