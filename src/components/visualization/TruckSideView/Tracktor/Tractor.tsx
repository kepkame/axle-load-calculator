import { TractorAxles } from './TractorAxles';
import { TractorCab } from './TractorCab';
import { TractorPlatform } from './TractorPlatform';

interface ITractorProps {
  axleCount: number;
}

export const Tractor: React.FC<ITractorProps> = ({ axleCount = 2 }) => {
  return (
    <>
      <TractorCab />
      <TractorPlatform axleCount={axleCount} />
      <TractorAxles axleCount={axleCount} />
    </>
  );
};
