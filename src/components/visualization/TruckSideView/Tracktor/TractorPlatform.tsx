import { useMemo } from 'react';
import { TRACTOR_FENDERS, TRACTOR_BACK_FRAMES } from '../data/platformData';
import { TractorAxleCount } from '../TruckSideView.types';

interface IPlatformProps {
  axleCount: number;
}

export const TractorPlatform: React.FC<IPlatformProps> = ({ axleCount }) => {
  const backFrameLines = useMemo(
    () =>
      TRACTOR_BACK_FRAMES[axleCount as TractorAxleCount].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      )),
    [axleCount],
  );

  const fenderLines = useMemo(
    () =>
      TRACTOR_FENDERS[axleCount as TractorAxleCount].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      )),
    [axleCount],
  );

  return (
    <g id="tractor-platform">
      <g id="front-section-of-frame">
        <line x1="57" y1="104" x2="81" y2="104" />
        <line x1="64" y1="131" x2="68" y2="131" />
        <line x1="54.7894" y1="102.386" x2="61.7894" y2="111.386" />
        <line x1="61.9889" y1="110.852" x2="64.9889" y2="130.852" />
        <line x1="69" y1="107" x2="69" y2="130" />
        <line x1="67.9487" y1="104.684" x2="68.9487" y2="107.684" />
        <line x1="79.6247" y1="100.219" x2="89.6247" y2="108.219" />
        <line x1="89" y1="108" x2="89" y2="130" />
      </g>

      <g id="back-section-of-frame">{backFrameLines}</g>

      <g id="fenders">
        {fenderLines}
        <line x1="189.953" y1="103.697" x2="196.953" y2="125.697"></line>
      </g>
    </g>
  );
};
