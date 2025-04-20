import { TractorAxles } from './TractorAxles';
import { TractorCab } from './TractorCab';
import { TractorPlatform } from './TractorPlatform';

interface TractorProps {
  axleCount: number;
}

export const Tractor: React.FC<TractorProps> = ({ axleCount = 2 }) => {
  return (
    <>
      <TractorCab />
      <TractorPlatform axleCount={axleCount} />
      <TractorAxles axleCount={axleCount} />
    </>
  );
};
