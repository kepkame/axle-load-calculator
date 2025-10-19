import { AXLE_STATUS_PRIORITY } from '../helpers/axleStatusPriority';
import type { AxleStatus } from '@shared-types/loadStatus';
import type { AxleCoord } from '../TruckTopView.types';

const FLOAT_TOLERANCE = 0.1 as const;

/**
 * Determines the display status for a group of pallets based on proximity to axles.
 *
 * Logic:
 * - Finds the axle closest to the center of the current cargo row (rowCenter).
 * - If multiple axles are equally close, picks the one with the highest severity (priority).
 * - Used for color-coding pallet groups in trailer visualization.
 */
export const getGroupStatus = (rowCenter: number, axles: AxleCoord[]): AxleStatus => {
  // Defensive: Return "default" if inputs are invalid (protects UI from bad data)
  if (!Number.isFinite(rowCenter) || !Array.isArray(axles) || axles.length === 0) {
    return 'default';
  }

  let minDistance = Number.POSITIVE_INFINITY;
  let selectedStatus: AxleStatus = 'default';

  for (const { yPx, status } of axles) {
    const distance = Math.abs(yPx - rowCenter);

    // "isCloser": True if this axle is closer to the row center than previous
    // Uses a tolerance constant to avoid floating-point errors
    const isCloser = distance < minDistance - FLOAT_TOLERANCE;

    // "isSameButHigher": True if this axle is equally close but has a higher severity (priority)
    const isSameButHigher =
      Math.abs(distance - minDistance) < FLOAT_TOLERANCE &&
      AXLE_STATUS_PRIORITY[status] > AXLE_STATUS_PRIORITY[selectedStatus];

    // Update if current axle is closer, or equally close but with a higher priority
    if (isCloser || isSameButHigher) {
      minDistance = distance;
      selectedStatus = status;
    }
  }

  return selectedStatus;
};
