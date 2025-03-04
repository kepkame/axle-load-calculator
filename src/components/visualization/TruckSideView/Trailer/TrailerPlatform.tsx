import { TRAILER_FRONT_SECTION, TRAILER_FENDERS } from '../data/platformData';

interface ITrailerPlatformProps {
  axleCount: number;
}

export const TrailerPlatform: React.FC<ITrailerPlatformProps> = ({ axleCount = 3 }) => {
  return (
    <g id="trailer-platform">
      <g id="front-section-of-frame-trailer" data-attr={axleCount}>
        <line x1="208" y1="102" x2="208" y2="130" />
        <line x1="206" y1="131" x2="220" y2="131" />
        <line x1="217" y1="110" x2="217" y2="130" />
        <line x1="221" y1="112" x2="221" y2="124" />
        <line x1={TRAILER_FRONT_SECTION[axleCount][0]} y1="125" x2="207" y2="125" />
        <line x1="218" y1="111" x2={TRAILER_FRONT_SECTION[axleCount][1]} y2="111" />
        <line
          x1={TRAILER_FRONT_SECTION[axleCount][2]}
          y1="112"
          x2={TRAILER_FRONT_SECTION[axleCount][2]}
          y2="124"
        />
      </g>

      <g id="fenders-trailer">
        <line
          x1={TRAILER_FENDERS[axleCount][0][0]}
          y1="125.709"
          x2={TRAILER_FENDERS[axleCount][0][1]}
          y2="102.709"
        />
        <line
          x1={TRAILER_FENDERS[axleCount][1][0]}
          y1="103"
          x2={TRAILER_FENDERS[axleCount][1][1]}
          y2="103"
        />
        <line
          x1={TRAILER_FENDERS[axleCount][2][0]}
          y1="101.664"
          x2={TRAILER_FENDERS[axleCount][2][1]}
          y2="129.664"
        />
      </g>

      <g id="back-section-of-frame-trailer">
        <line x1="431" y1="111" x2="466" y2="111" />
        <line x1="465.588" y1="111.191" x2="476.588" y2="119.191" />
        <line x1="480" y1="119" x2="476" y2="119" />
        <line x1="481" y1="102" x2="481" y2="120" />
      </g>
    </g>
  );
};
