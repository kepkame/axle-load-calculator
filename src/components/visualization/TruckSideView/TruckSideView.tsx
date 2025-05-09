import { Tractor } from './Tracktor/Tractor';
import { Trailer } from './Trailer/Trailer';
import type { AxleStatus } from '../TruckVisualizer/models';
import type { TruckSideViewProps } from './TruckSideView.types';
import styles from './TruckSideView.module.scss';

/**
 * Renders the full side view of the truck and trailer with axle statuses
 */
export const TruckSideView: React.FC<TruckSideViewProps> = ({
  tractorAxleCount = 2,
  trailerAxleCount = 3,
  axles,
}) => {
  // Extracts and sorts statuses for tractor axles
  const tractorStatuses: AxleStatus[] = axles
    .filter((axle) => axle.axleType === 'truck' && axle.status !== undefined)
    .sort((a, b) => a.index - b.index)
    .map((axle) => axle.status as AxleStatus);

  // Extracts and sorts statuses for trailer axles
  const trailerStatuses: AxleStatus[] = axles
    .filter((axle) => axle.axleType === 'trailer' && axle.status !== undefined)
    .sort((a, b) => a.index - b.index)
    .map((axle) => axle.status as AxleStatus);

  return (
    <svg
      width="482"
      height="143"
      viewBox="0 0 482 143"
      className={styles.media}
      aria-label="Визуализация тягача и прицепа"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Trailer axleCount={trailerAxleCount} statuses={trailerStatuses} />
      <Tractor axleCount={tractorAxleCount} statuses={tractorStatuses} />
    </svg>
  );
};
