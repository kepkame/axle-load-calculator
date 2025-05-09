import {
  TRACTOR_AXLE_X_POSITIONS,
  TRAILER_AXLE_X_POSITIONS,
  TRACTOR_2_5_AXLE_D,
} from '../data/axleData';
import recalculateAxlePathX from '../utils/recalculateAxlePathX';

/**
 * Returns array of <path> elements based on axle positions and optional custom path shape
 */
const getAxles = (
  axleCount: number,
  positions: Record<number, number[]>,
  customOriginalD?: (index: number) => string | undefined,
) => {
  const axlePositions = positions[axleCount] || [];

  return axlePositions.map((newLeftX, index) => (
    <path key={index} d={recalculateAxlePathX({ newLeftX, originalD: customOriginalD?.(index) })} />
  ));
};

/**
 * Returns SVG paths for tractor axles, supports special shape for 2.5-axle configuration
 */
export const getTractorAxles = (axleCount: number): JSX.Element[] =>
  getAxles(axleCount, TRACTOR_AXLE_X_POSITIONS, (index) =>
    axleCount === 2.5 && index === 1 ? TRACTOR_2_5_AXLE_D : undefined,
  );

/**
 * Returns SVG paths for trailer axles based on axle count
 */
export const getTrailerAxles = (axleCount: number): JSX.Element[] =>
  getAxles(axleCount, TRAILER_AXLE_X_POSITIONS);
