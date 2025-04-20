import {
  TractorAxleCount,
  TrailerAxleCount,
} from '@components/visualization/TruckSideView/TruckSideView.types';

/** Default axle load values depending on type and role */
export const AXLE_LOAD_DEFAULTS = {
  truckLeading: { axleLoadEmpty: 29.99, axleLoadLimit: 46.77 },
  truckStandard: { axleLoadEmpty: 23, axleLoadLimit: 27 },
  trailerStandard: { axleLoadEmpty: 13, axleLoadLimit: 17 },
};

/** Allowed axle counts for tractors (e.g. 2 = standard, 2.5 = includes a lifted axle) */
export const ALLOWED_TRUCK_AXLES: readonly TractorAxleCount[] = [2, 2.5, 3];

/** Allowed axle counts for trailers (commonly 2, 3, or 4 axles) */
export const ALLOWED_TRAILER_AXLES: readonly TrailerAxleCount[] = [2, 3, 4];

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
