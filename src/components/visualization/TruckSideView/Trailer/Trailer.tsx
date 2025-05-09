import { TrailerAxles } from './TrailerAxles';
import { TrailerCargoBox } from './TrailerCargoBox';
import { TrailerPlatform } from './TrailerPlatform';
import type { AxleStatus } from '@components/visualization/TruckVisualizer/models';

interface TrailerProps {
  axleCount: number;
  statuses: AxleStatus[];
}

/**
 * Renders the trailer section with cargo box, platform, and axles
 */
export const Trailer: React.FC<TrailerProps> = ({ axleCount = 3, statuses }) => {
  return (
    <>
      <TrailerCargoBox />
      <TrailerPlatform axleCount={axleCount} />
      <TrailerAxles axleCount={axleCount} statuses={statuses} />
    </>
  );
};
