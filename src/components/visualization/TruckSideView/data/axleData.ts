/** X-coordinates for tractor axles by axle count */
export const TRACTOR_AXLE_X_POSITIONS: Record<number, number[]> = {
  '2': [30, 161],
  '3': [30, 126, 161],
};

/** X-coordinates for trailer axles by axle count */
export const TRAILER_AXLE_X_POSITIONS: Record<number, number[]> = {
  '2': [363, 399],
  '3': [327, 363, 399],
  '4': [291, 327, 363, 399],
};

/** Default circular axle shape used in most cases */
export const DEFAULT_AXLE_PATH_D =
  'M31 124C31 134.078 23.933 142 15.5 142C7.067 142 0 134.078 0 124C0 113.922 7.067 106 15.5 106C23.933 106 31 113.922 31 124Z';

/** Lifted circular axle */
export const LIFTED_AXLE_PATH_D =
  'M148 120C148 128.414 142.058 135 135 135C127.942 135 122 128.414 122 120C122 111.586 127.942 105 135 105C142.058 105 148 111.586 148 120Z';
