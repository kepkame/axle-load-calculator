/** Allowed axle counts for truck as string literals */
export const ALLOWED_TRUCK_AXLES = ['2', '3'] as const;
/** Allowed axle counts for trailer as string literals */
export const ALLOWED_TRAILER_AXLES = ['2', '3', '4'] as const;

export const ALLOWED_AXLE_COUNTS = {
  truck: ALLOWED_TRUCK_AXLES,
  trailer: ALLOWED_TRAILER_AXLES,
};

// String literal union types derived from the arrays
export type TruckAxleCount = (typeof ALLOWED_TRUCK_AXLES)[number];
export type TrailerAxleCount = (typeof ALLOWED_TRAILER_AXLES)[number];
