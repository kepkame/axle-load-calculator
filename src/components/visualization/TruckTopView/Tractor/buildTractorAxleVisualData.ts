import { getAxleStatus } from '@utils/getLoadStatus';
import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import { getTruckAxleCoords } from '../utils/getTruckAxleCoords';
import type { TrailerAxleVisualData } from '../TruckTopView.types';

/**
 * Returns an array of visual data for each tractor axle.
 * Allows rendering axles with correct color, position, and lift state.
 */
export const buildTractorAxleVisualData = (
  axleCount: '2' | '3',
  truckWheelbase: number[],
  resultCalc: LoadStatusRow[],
  pxPerMm: number,
  isLoading: boolean,
): TrailerAxleVisualData[] => {
  const axlePositionsM = getTruckAxleCoords(axleCount, truckWheelbase);
  const axlePositionsPx = axlePositionsM.map((positionM) => positionM * 1000 * pxPerMm);

  return axlePositionsPx.map((yPx, index) => {
    const axle = resultCalc[index];
    const statusClass = isLoading
      ? 'loading'
      : axle
      ? getAxleStatus(axle.actualLoad, axle.maxLoad)
      : 'default';

    return {
      yPx,
      isLifted: Boolean(axle?.lifted),
      statusClass,
      axleIndex: index,
      axleId: axle?.axleKey ?? `truck-axle-${index}`,
    };
  });
};
