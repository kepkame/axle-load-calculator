import {
  ALLOWED_TRAILER_AXLES,
  ALLOWED_TRUCK_AXLES,
  type TrailerAxleCount,
  type TruckAxleCount,
} from '@shared-constants/axleCounts';

/** Type guard for TruckAxleCount */
export const isValidTruckAxleCount = (value: string): value is TruckAxleCount => {
  return ALLOWED_TRUCK_AXLES.includes(value as TruckAxleCount);
};

/** Type guard for TrailerAxleCount */
export const isValidTrailerAxleCount = (value: string): value is TrailerAxleCount => {
  return ALLOWED_TRAILER_AXLES.includes(value as TrailerAxleCount);
};
