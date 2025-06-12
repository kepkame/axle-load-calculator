import { ALLOWED_TRUCK_AXLES, ALLOWED_TRAILER_AXLES } from '@shared-constants/axleCounts';

type TractorAxleCount = (typeof ALLOWED_TRUCK_AXLES)[number];
type TrailerAxleCount = (typeof ALLOWED_TRAILER_AXLES)[number];

export const TRACTOR_FENDERS: Record<TractorAxleCount, string[][]> = {
  '2': [
    ['156.015', '131.83', '161.015', '102.83'],
    ['160', '103', '191', '103'],
  ],
  '3': [
    ['121.015', '131.83', '126.015', '102.83'],
    ['126', '103', '191', '103'],
  ],
};

export const TRACTOR_BACK_FRAMES: Record<TractorAxleCount, string[][]> = {
  '2': [
    ['91', '115', '152', '115'],
    ['146', '102', '146', '107'],
    ['154', '102', '154', '107'],
    ['89', '108', '161', '108'],
    ['68', '131', '157', '131'],
  ],
  '3': [
    ['91', '115', '123', '115'],
    ['89', '108', '125', '108'],
    ['68', '131', '122', '131'],
  ],
};

export const TRAILER_FRONT_SECTION: Record<TrailerAxleCount, string[]> = {
  '2': ['358', '362', '354'],
  '3': ['323', '326', '319'],
  '4': ['287', '291', '283'],
};

export const TRAILER_FENDERS: Record<TrailerAxleCount, string[][]> = {
  '2': [
    ['358.043', '365.043'],
    ['365', '427'],
    ['426.942', '436.942'],
  ],
  '3': [
    ['322.043', '329.043'],
    ['328', '427'],
    ['426.942', '436.942'],
  ],
  '4': [
    ['286.043', '293.043'],
    ['293', '427'],
    ['426.942', '436.942'],
  ],
};
