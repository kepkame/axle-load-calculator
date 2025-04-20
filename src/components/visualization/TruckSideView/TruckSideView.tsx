import { Tractor } from './Tracktor/Tractor';
import { Trailer } from './Trailer/Trailer';
import styles from './TruckSideView.module.scss';

interface ITruckSideViewProps {
  title?: string;
  TractorAxleCount?: number;
  TrailerAxleCount?: number;
  className?: string;
}

export const TruckSideView: React.FC<ITruckSideViewProps> = ({
  title = 'Нагрузка на оси',
  TractorAxleCount = 2,
  TrailerAxleCount = 3,
  className,
}) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="482"
        height="143"
        viewBox="0 0 482 143"
        fill="none"
        stroke="#232323"
        strokeWidth="2"
        className={styles.media}
      >
        <Trailer axleCount={TrailerAxleCount} />
        <Tractor axleCount={TractorAxleCount} />
      </svg>
    </div>
  );
};
