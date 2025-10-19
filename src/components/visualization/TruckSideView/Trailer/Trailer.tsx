import type { AxleStatus } from '@shared-types/loadStatus';
import type { TrailerAxleCount } from '@shared-constants/axleCounts';
import { AxlesRenderer } from '../AxlesRenderer/AxlesRenderer';
import { TrailerCargoBox } from './TrailerCargoBox';
import { TrailerPlatform } from './TrailerPlatform';

interface TrailerProps {
  axleCount: TrailerAxleCount;
  statuses: AxleStatus[];
  lifted: boolean[];
}

/** Renders the trailer section with cargo box, platform, and axles */
export const Trailer: React.FC<TrailerProps> = ({ axleCount, statuses, lifted }) => {
  return (
    <>
      <TrailerCargoBox />
      <TrailerPlatform axleCount={axleCount} />
      <AxlesRenderer axleCount={axleCount} axleType="trailer" statuses={statuses} lifted={lifted} />
    </>
  );
};
