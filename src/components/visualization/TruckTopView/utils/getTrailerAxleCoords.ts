import { TRAILER_REAR_AXLE_DISTANCE_FROM_END_M } from '@components/visualization/TruckTopView/data/constants';

/**
 * Calculates Y-coordinates (in meters from the front of the trailer) for all trailer axles.
 *
 * Starts from a fixed offset at the rear, then iteratively subtracts wheelbase distances "backwards".
 * Wheelbase is expected in the order: [distance between last and penultimate, ..., to first].
 */
export const getTrailerAxleCoords = (deckLength: number, wheelbase: number[]): number[] => {
  // Rear-most axle position (from front edge of trailer)
  const base = deckLength - TRAILER_REAR_AXLE_DISTANCE_FROM_END_M;
  const coords = [base];

  // Iterate backward over wheelbase: each previous axle is further from the rear
  for (let i = wheelbase.length - 1; i >= 0; i--) {
    const prev = coords[0] - wheelbase[i];
    coords.unshift(prev);
  }

  return coords;
};
