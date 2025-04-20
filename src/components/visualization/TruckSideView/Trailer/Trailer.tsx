import { TrailerAxles } from './TrailerAxles';
import { TrailerCargoBox } from './TrailerCargoBox';
import { TrailerPlatform } from './TrailerPlatform';

interface TrailerProps {
  axleCount: number;
}

export const Trailer: React.FC<TrailerProps> = ({ axleCount = 3 }) => {
  return (
    <>
      <TrailerCargoBox />
      <TrailerPlatform axleCount={axleCount} />
      <TrailerAxles axleCount={axleCount} />
    </>
  );
};
