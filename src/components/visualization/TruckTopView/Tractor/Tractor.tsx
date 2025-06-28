import clsx from 'clsx';
import { Axle } from '../Axle/Axle';
import { TRACTOR_CAB_REAL_LENGTH_M } from '../data/constants';
import { buildTractorAxleVisualData } from './buildTractorAxleVisualData';
import type { TractorProps } from './Tractor.types';
import styles from './Tractor.module.scss';

/** Renders the top-down view of the tractor (cab + axles) in the cargo placement diagram. */
export const Tractor: React.FC<TractorProps> = ({
  dataVehicle,
  dataResultCalc,
  pxPerMm,
  wheelHeightPx,
  isLoading,
}) => {
  const cabLengthPx = TRACTOR_CAB_REAL_LENGTH_M * 1000 * pxPerMm;
  const axleCount = dataVehicle.truckAxles;
  const axleVisualData = buildTractorAxleVisualData(
    axleCount,
    dataVehicle.truckWheelbase,
    dataResultCalc,
    pxPerMm,
    isLoading,
  );

  // Determine color status for the cab
  let cabStatus: string = 'default';
  if (isLoading) {
    cabStatus = 'loading';
  } else {
    const status = axleVisualData[0]?.statusClass;
    cabStatus = status === 'out' || !status ? 'default' : status;
  }

  const cabClasses = clsx(styles.cab, styles[`cab--${cabStatus}`]);

  return (
    <div className={styles.wrapper} style={{ height: `${cabLengthPx}px` }}>
      <div className={cabClasses} style={{ height: `${cabLengthPx}px` }}>
        <h4 className={styles.name}>Кабина</h4>
        <span>{dataVehicle.truckWeight}кг</span>
      </div>

      {/* Render all axles for tractor with physical y-coords */}
      {axleVisualData.map((axle) => (
        <Axle
          key={axle.axleId}
          yPx={axle.yPx}
          isLifted={axle.isLifted}
          status={axle.statusClass}
          wheelHeightPx={wheelHeightPx}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
