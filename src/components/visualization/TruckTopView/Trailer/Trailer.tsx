import { Axle } from '../Axle/Axle';
import { PalletsGroup } from '../Pallet/PalletsGroup';
import { buildTrailerAxleVisualData } from './utils/buildTrailerAxleVisualData';
import { calculateTrailerPalletLengthPx } from './utils/calculateTrailerPalletLength';
import { getRowRenderData } from './utils/getRowRenderData';
import type { TrailerProps } from './Trailer.types';
import styles from './Trailer.module.scss';

/**
 * Renders the top-down view of the trailer body (cargo deck and axles) for the visualization.
 *
 * Computes dynamic height so cargo always fits vertically (even if it "overflows" trailer).
 * Each group of pallets is rendered in sequence with per-row status.
 */
export const Trailer: React.FC<TrailerProps> = ({
  dataVehicle,
  dataCargo,
  dataResultCalc,
  trailerWrapperRef,
  pxPerMm,
  trailerLengthPx,
  wheelHeightPx,
  axlesForRows,
  isLoading,
}) => {
  const cargoGroup = dataCargo.cargoGroup;
  const cargoLengthPx = calculateTrailerPalletLengthPx(cargoGroup, pxPerMm);
  const safeLengthPx = Math.max(trailerLengthPx, cargoLengthPx);

  // Precompute axle positions and status for drawing
  const axleVisualData = buildTrailerAxleVisualData(
    dataVehicle.trailerWheelbase,
    Number(dataVehicle.deckLength),
    dataResultCalc,
    pxPerMm,
    isLoading,
  );

  // Precompute all data needed for rendering each cargo group row
  const rowRenderData = getRowRenderData(cargoGroup, pxPerMm, axlesForRows, isLoading);

  return (
    <div className={styles.wrapper} style={{ height: `${safeLengthPx}px` }}>
      <div
        ref={trailerWrapperRef}
        className={styles.trailer}
        style={{ height: `${trailerLengthPx}px` }}
      >
        {rowRenderData.map(({ key, group, pxPerMm, status }) => (
          <PalletsGroup key={key} group={group} pxPerMm={pxPerMm} status={status} />
        ))}
      </div>

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
