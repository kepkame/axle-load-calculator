import { ALLOWED_TRUCK_AXLES, ALLOWED_TRAILER_AXLES } from '@shared-constants/axleCounts';

export type TruckAxleCount = (typeof ALLOWED_TRUCK_AXLES)[number];
export type TrailerAxleCount = (typeof ALLOWED_TRAILER_AXLES)[number];

/** Default axle load values depending on type and role */
export const AXLE_LOAD_DEFAULTS = {
  truckLeading: { axleLoadEmpty: 3.28, axleLoadLimit: 7.5 },
  truckStandard: { axleLoadEmpty: 4.92, axleLoadLimit: 9.0 },
  trailerStandard: { axleLoadEmpty: 2.33, axleLoadLimit: 8.0 },
};

/** Maps each allowed truck axle count to a string option object for form fields */
export const TRUCK_AXLE_OPTIONS = ALLOWED_TRUCK_AXLES.map((val) => ({
  value: val.toString(),
  option: val.toString(),
}));

/** Maps each allowed trailer axle count to a string option object for form fields */
export const TRAILER_AXLE_OPTIONS = ALLOWED_TRAILER_AXLES.map((val) => ({
  value: val.toString(),
  option: val.toString(),
}));

/** Default values, grouped by vehicle type and axle role. */
export const DEFAULT_AXLE_VALUES = {
  truck: {
    lead: AXLE_LOAD_DEFAULTS.truckLeading,
    other: AXLE_LOAD_DEFAULTS.truckStandard,
  },
  trailer: AXLE_LOAD_DEFAULTS.trailerStandard,
};
