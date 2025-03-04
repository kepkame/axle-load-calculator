import {
  TRACTOR_AXLE_X_POSITIONS,
  TRAILER_AXLE_X_POSITIONS,
  TRACTOR_2_5_AXLE_D,
} from '../data/axleData';
import recalculateAxlePathX from '../utils/recalculateAxlePathX';

const getAxles = (
  axleCount: number,
  positions: Record<number, number[]>,
  status?: string,
  customOriginalD?: (index: number) => string | undefined,
) => {
  const axlePositions = positions[axleCount] || [];

  return axlePositions.map((newLeftX, index) => (
    <path
      key={index}
      d={recalculateAxlePathX({ newLeftX, originalD: customOriginalD?.(index) })}
      fill={status}
    />
  ));
};

export const getTractorAxles = (axleCount: number, status?: string) =>
  getAxles(axleCount, TRACTOR_AXLE_X_POSITIONS, status, (index) =>
    axleCount === 2.5 && index === 1 ? TRACTOR_2_5_AXLE_D : undefined,
  );

export const getTrailerAxles = (axleCount: number, status?: string) =>
  getAxles(axleCount, TRAILER_AXLE_X_POSITIONS, status);
