import { TrailerAxles } from './TrailerAxles';
import { TrailerCargoBox } from './TrailerCargoBox';
import { TrailerPlatform } from './TrailerPlatform';

interface ITrailerProps {
  axleCount: number;
}

export const Trailer: React.FC<ITrailerProps> = ({ axleCount = 3 }) => {
  return (
    <>
      <TrailerCargoBox />
      <TrailerPlatform axleCount={axleCount} />
      <TrailerAxles axleCount={axleCount} />
    </>
  );
};
