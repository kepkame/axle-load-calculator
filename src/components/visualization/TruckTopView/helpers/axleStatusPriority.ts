import { AxleStatus } from '../../TruckVisualizer/models';

/**
 * Defines visual severity priority for each axle status.
 * Used to resolve conflicts when multiple axles are equidistant.
 */
export const AXLE_STATUS_PRIORITY: Record<AxleStatus, number> = {
  danger: 3,
  warning: 2,
  success: 1,
  default: 0,
  loading: -1,
  out: 4, // 'out' treated higher than 'danger'
};
