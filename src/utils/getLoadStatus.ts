import { DANGER_THRESHOLD, WARNING_THRESHOLD } from '@shared-constants/loadStatus';
import { AxleStatus } from '../components/visualization/TruckVisualizer/models';

/**
 * Returns load ratio for an axle, guarding against division by zero.
 *
 * NOTE: If max is zero or negative, treat as infinite overload.
 */
export const calculateLoadRatio = (actual: number, max: number): number => {
  if (max <= 0) return Infinity;
  return actual / max;
};

/**
 * Maps axle load ratio to color/status bucket for visualization.
 *
 * Thresholds are defined in @shared-constants/loadStatus:
 * - ratio > DANGER_THRESHOLD   → 'danger'
 * - ratio >= WARNING_THRESHOLD → 'warning'
 * - below that                → 'success'
 */
export const getAxleStatus = (actual: number, max: number): AxleStatus => {
  const ratio = calculateLoadRatio(actual, max);

  if (ratio > DANGER_THRESHOLD) return 'danger';
  if (ratio >= WARNING_THRESHOLD) return 'warning';
  return 'success';
};
