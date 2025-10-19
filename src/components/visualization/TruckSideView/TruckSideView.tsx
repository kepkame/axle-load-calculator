import { Tractor } from './Tracktor/Tractor';
import { Trailer } from './Trailer/Trailer';
import type { AxleStatus } from '@shared-types/loadStatus';
import type { TruckSideViewProps } from './TruckSideView.types';
import { isValidTruckAxleCount, isValidTrailerAxleCount } from './utils/axleCountGuards';
import styles from './TruckSideView.module.scss';

/** Renders the full side view of the truck and trailer with axle statuses */
export const TruckSideView: React.FC<TruckSideViewProps> = ({ axles }) => {
  if (axles.length === 0) {
    return <div className={styles.error}>Ошибка: отсутствуют данные об осях</div>;
  }

  // Group and order axles by type
  const tractorAxles = axles
    .filter((axle) => axle.axleType === 'truck')
    .sort((a, b) => a.index - b.index);

  const trailerAxles = axles
    .filter((axle) => axle.axleType === 'trailer')
    .sort((a, b) => a.index - b.index);

  const tractorAxleCountStr = tractorAxles.length.toString();
  const trailerAxleCountStr = trailerAxles.length.toString();

  // Validate supported axle counts (avoids rendering unknown layouts)
  if (!isValidTruckAxleCount(tractorAxleCountStr)) {
    return <div className={styles.error}>Ошибка: неподдерживаемое число осей тягача</div>;
  }

  if (!isValidTrailerAxleCount(trailerAxleCountStr)) {
    return <div className={styles.error}>Ошибка: неподдерживаемое число осей полуприцепа</div>;
  }

  // Extract axle status and lifted flags for rendering
  const tractorStatuses: AxleStatus[] = tractorAxles.map((axle) => axle.status ?? 'default');
  const trailerStatuses: AxleStatus[] = trailerAxles.map((axle) => axle.status ?? 'default');

  const tractorLifted: boolean[] = tractorAxles.map((axle) => axle.lifted);
  const trailerLifted: boolean[] = trailerAxles.map((axle) => axle.lifted);

  return (
    <svg
      width="482"
      height="143"
      viewBox="0 0 482 143"
      className={styles.media}
      aria-label="Визуализация тягача и прицепа"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Tractor axleCount={tractorAxleCountStr} statuses={tractorStatuses} lifted={tractorLifted} />
      <Trailer axleCount={trailerAxleCountStr} statuses={trailerStatuses} lifted={trailerLifted} />
    </svg>
  );
};
