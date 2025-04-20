import { useWatch } from 'react-hook-form';
import { TruckSideView } from '@components/visualization/TruckSideView/TruckSideView';
import {
  TractorAxleCount,
  TrailerAxleCount,
} from '@components/visualization/TruckSideView/TruckSideView.types';
import { parseAxleValue } from '@pages/Step1/utils/parseAxleValue';
import { TruckAxleVisualizerProps } from './TruckAxleVisualizer.types';

const ALLOWED_TRACTOR_AXLES = [2, 2.5, 3] as const;
const ALLOWED_TRAILER_AXLES = [2, 3, 4] as const;

const DEFAULT_TRACTOR_AXLE: TractorAxleCount = 2;
const DEFAULT_TRAILER_AXLE: TrailerAxleCount = 3;

export const TruckAxleVisualizer: React.FC<TruckAxleVisualizerProps> = ({ control, className }) => {
  const rawTractorAxles = useWatch({ control, name: 'truckAxles' });
  const rawTrailerAxles = useWatch({ control, name: 'trailerAxles' });

  const tractorAxleCount = parseAxleValue({
    raw: rawTractorAxles,
    allowed: ALLOWED_TRACTOR_AXLES,
    fallback: DEFAULT_TRACTOR_AXLE,
  });
  const trailerAxleCount = parseAxleValue({
    raw: rawTrailerAxles,
    allowed: ALLOWED_TRAILER_AXLES,
    fallback: DEFAULT_TRAILER_AXLE,
  });

  return (
    <TruckSideView
      TractorAxleCount={tractorAxleCount}
      TrailerAxleCount={trailerAxleCount}
      className={className}
    />
  );
};
