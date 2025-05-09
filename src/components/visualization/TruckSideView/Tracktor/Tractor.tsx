import { TractorAxles } from './TractorAxles';
import { TractorCab } from './TractorCab';
import { TractorPlatform } from './TractorPlatform';
import type { AxleStatus } from '@components/visualization/TruckVisualizer/models';

interface TractorProps {
  axleCount: number;
  statuses: AxleStatus[];
}

/**
 * Renders the tractor section with cab, platform, and axle visuals
 */
export const Tractor: React.FC<TractorProps> = ({ axleCount = 2, statuses }) => {
  return (
    <>
      <TractorCab />
      <TractorPlatform axleCount={axleCount} />
      <TractorAxles axleCount={axleCount} statuses={statuses} />
    </>
  );
};
