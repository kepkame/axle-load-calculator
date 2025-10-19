import clsx from 'clsx';
import type { AxleStatus } from '@shared-types/loadStatus';
import { TrailerAxleCount, TruckAxleCount } from '@shared-constants/axleCounts';
import {
  TRACTOR_AXLE_X_POSITIONS,
  TRAILER_AXLE_X_POSITIONS,
  DEFAULT_AXLE_PATH_D,
  LIFTED_AXLE_PATH_D,
} from '../data/axleData';
import { generateAxlePathD } from '../utils/generateAxlePathD';
import styles from '../TruckSideView.module.scss';

/**
 * Generates a <g> group containing the visual SVG representation of all axles.
 * Supports both truck and trailer axles.
 */
export const createAxleGroup = (
  axleCount: TruckAxleCount | TrailerAxleCount,
  axleType: 'truck' | 'trailer',
  statuses: AxleStatus[],
  lifted: boolean[],
): JSX.Element[] => {
  const positionMap = axleType === 'truck' ? TRACTOR_AXLE_X_POSITIONS : TRAILER_AXLE_X_POSITIONS;
  const xPositions = positionMap[axleCount];

  if (!xPositions) {
    throw new Error(`createAxleGroup: unsupported axle count: ${axleType}=${axleCount}`);
  }

  return xPositions.map((originalX, index) => {
    const status = statuses[index];
    const isLifted = lifted[index];

    const targetLeftX = isLifted ? originalX + 2 : originalX;

    const pathD = isLifted
      ? generateAxlePathD({ targetLeftX, originalD: LIFTED_AXLE_PATH_D })
      : generateAxlePathD({ targetLeftX, originalD: DEFAULT_AXLE_PATH_D });

    return (
      <g
        key={index}
        className={clsx(styles.axle, status && status !== 'default' && styles[`axle--${status}`])}
      >
        <path d={pathD} />
      </g>
    );
  });
};
