import type { AxleStatus } from '@shared-types/loadStatus';
import { AXLE_STATUS_PRIORITY } from '../helpers/axleStatusPriority';
import type { AxleCoord } from '../TruckTopView.types';

/**
 * Returns the status of the closest axle to the given position (Y),
 * preferring higher-priority status if multiple axles are equally close.
 *
 * Used for coloring cargo rows by their nearest axle state.
 */
export const findClosestAxleWithPriority = (axles: AxleCoord[], targetY: number): AxleStatus => {
  if (!Array.isArray(axles) || axles.length === 0) {
    return 'default';
  }

  let minDistance = Number.POSITIVE_INFINITY;
  let closest: AxleCoord[] = [];

  for (const axle of axles) {
    if (typeof axle.yPx !== 'number' || !axle.status) continue;

    const distance = Math.abs(axle.yPx - targetY);

    if (distance < minDistance) {
      minDistance = distance;
      closest = [axle];
    } else if (distance === minDistance) {
      closest.push(axle);
    }
  }

  // If nothing is found
  if (closest.length === 0) {
    return 'default';
  }

  // Get the status with the highest priority
  const status: AxleStatus = closest.reduce<AxleStatus>((acc, axle) => {
    const currentPriority = AXLE_STATUS_PRIORITY[axle.status] ?? 0;
    const accPriority = AXLE_STATUS_PRIORITY[acc] ?? 0;
    return currentPriority > accPriority ? axle.status : acc;
  }, 'default');

  return status;
};
