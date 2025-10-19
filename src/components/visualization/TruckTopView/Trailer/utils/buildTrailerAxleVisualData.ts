import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type { AxleStatus } from '@shared-types/loadStatus';
import { getAxleStatus } from '@utils/getLoadStatus';
import { getTrailerAxleCoords } from '../../utils/getTrailerAxleCoords';
import type { TrailerAxleVisualData } from '../../TruckTopView.types';

/**
 * Builds an array of visual data for trailer axles.
 * Allows rendering axles with correct color, position, and lift state.
 */
export function buildTrailerAxleVisualData(
  trailerWheelbase: number[],
  deckLength: number,
  resultCalc: LoadStatusRow[],
  pxPerMm: number,
  isLoading: boolean,
): TrailerAxleVisualData[] {
  const axlePositionsM = getTrailerAxleCoords(deckLength, trailerWheelbase);
  const axlePositionsPx = axlePositionsM.map((coordM) => coordM * 1000 * pxPerMm);

  return axlePositionsPx.map((yPx, index) => {
    const axle = resultCalc[index];
    const statusClass: AxleStatus = isLoading
      ? 'loading'
      : axle
      ? getAxleStatus(axle.actualLoad, axle.maxLoad)
      : 'default';

    return {
      yPx,
      isLifted: Boolean(axle?.lifted),
      statusClass,
      axleIndex: index,
      axleId: axle?.axleKey ?? `axle-${index}`,
    };
  });
}
