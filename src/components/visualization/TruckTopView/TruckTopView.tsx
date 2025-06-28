import { useRef } from 'react';
import { Tractor } from './Tractor/Tractor';
import { Trailer } from './Trailer/Trailer';
import {
  TRACTOR_CAB_REAL_LENGTH_M,
  TRAILER_REAL_WIDTH_M,
  WHEEL_REAL_LENGTH_MM,
} from './data/constants';
import { useContentWidthWithoutBorder } from './hooks/useContentWidthWithoutBorder';
import { buildTractorAxleVisualData } from './Tractor/buildTractorAxleVisualData';
import { buildTrailerAxleVisualData } from './Trailer/utils/buildTrailerAxleVisualData';
import type { AxleCoord, TruckTopViewProps } from './TruckTopView.types';
import styles from './TruckTopView.module.scss';

/**
 * High-level cargo/axle visualization: top-down schematic of truck + trailer.
 *
 * - All pixel calculations are relative to available container width.
 * - Axle/row overlays are color-coded based on current load status.
 */
export const TruckTopView: React.FC<TruckTopViewProps> = ({
  dataVehicle,
  dataCargo,
  dataResultCalc,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailerWidthPx = useContentWidthWithoutBorder(containerRef);

  // Calculate px/mm scale for correct proportions across all child components
  const pxPerMm = trailerWidthPx / (TRAILER_REAL_WIDTH_M * 1000);

  // Physical sizes for trailer/cab/wheel visual elements
  const trailerLengthPx = Math.ceil(dataVehicle.deckLength * 1000 * pxPerMm);
  const cabLengthPx = TRACTOR_CAB_REAL_LENGTH_M * 1000 * pxPerMm;
  const wheelHeightPx = WHEEL_REAL_LENGTH_MM * pxPerMm;

  // Split axle data by type for each visual region
  const truckResult = dataResultCalc.filter((axle) => axle.axleType === 'truck');
  const trailerResult = dataResultCalc.filter((axle) => axle.axleType === 'trailer');

  const isLoading = dataResultCalc.length === 0;

  // Build absolute positions and status for axles
  const tractorAxles = buildTractorAxleVisualData(
    dataVehicle.truckAxles,
    dataVehicle.truckWheelbase,
    truckResult,
    pxPerMm,
    isLoading,
  );
  const trailerAxles = buildTrailerAxleVisualData(
    dataVehicle.trailerWheelbase,
    Number(dataVehicle.deckLength),
    trailerResult,
    pxPerMm,
    isLoading,
  );

  // Shift tractor axle Y to trailer coordinate space (0 = deck top).
  // Required to compare pallet rows with all axles by vertical position.
  const axlesForRows: AxleCoord[] = [
    ...tractorAxles.map((a) => ({
      yPx: a.yPx - cabLengthPx,
      status: a.statusClass,
    })),
    ...trailerAxles.map((a) => ({
      yPx: a.yPx,
      status: a.statusClass,
    })),
  ];

  return (
    <div className={styles.vehicle}>
      <Tractor
        dataVehicle={dataVehicle}
        dataCargo={dataCargo}
        dataResultCalc={truckResult}
        pxPerMm={pxPerMm}
        trailerLengthPx={trailerLengthPx}
        wheelHeightPx={wheelHeightPx}
        isLoading={isLoading}
      />
      <Trailer
        dataVehicle={dataVehicle}
        dataCargo={dataCargo}
        dataResultCalc={trailerResult}
        trailerWrapperRef={containerRef}
        pxPerMm={pxPerMm}
        trailerLengthPx={trailerLengthPx}
        wheelHeightPx={wheelHeightPx}
        axlesForRows={axlesForRows}
        isLoading={isLoading}
      />
    </div>
  );
};
