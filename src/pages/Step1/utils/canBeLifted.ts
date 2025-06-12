/**
 * Determines whether an axle is eligible to be marked as liftable.
 *
 * Business rules:
 * - For trucks: only middle/rear axles (in a 3-axle setup) can be lifted.
 * - For trailers: all except the last axle can potentially be lifted.
 */
export const canBeLifted = (
  axleType: 'truck' | 'trailer',
  relativeIndex: number,
  axleCount: number,
): boolean => {
  if (axleType === 'truck') {
    return axleCount === 3 && relativeIndex > 0;
  }
  if (axleType === 'trailer') {
    return relativeIndex < axleCount - 1;
  }

  return false;
};
