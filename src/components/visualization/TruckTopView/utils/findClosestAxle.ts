/**
 * Finds the index of the axle that is closest to the given position,
 * based on the absolute distance between the axle and the target coordinate.
 *
 * @returns the index of the nearest axle
 */
export const findClosestAxle = (axleCoords: number[], targetPosition: number): number => {
  let minDist = Infinity;
  let closestIndex = -1;

  for (let i = 0; i < axleCoords.length; i++) {
    const dist = Math.abs(axleCoords[i] - targetPosition);

    if (dist < minDist) {
      minDist = dist;
      closestIndex = i;
    }
  }

  return closestIndex;
};
