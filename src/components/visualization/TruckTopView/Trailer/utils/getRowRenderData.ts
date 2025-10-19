import { getPalletById } from '@entities/step2Form/pallet/utils';
import type { AxleStatus } from '@shared-types/loadStatus';
import { getRowTopPx } from '../../utils/getRowTopPx';
import { getGroupStatus } from '../../utils/getGroupStatus';
import type { AxleCoord } from '../../TruckTopView.types';
import type { TrailerProps } from '../Trailer.types';

/**
 * Prepares render metadata for each pallet row:
 * - position
 * - visual status (based on closest axle)
 * - group reference and key
 */
export const getRowRenderData = (
  cargoGroup: TrailerProps['dataCargo']['cargoGroup'],
  pxPerMm: number,
  axlesForRows: AxleCoord[],
  isLoading: boolean,
) => {
  return cargoGroup.map((group, index) => {
    const { length: palletLengthMm } = getPalletById(group.palletId);

    // Y offset of this row in px, based on previous groups
    const rowTopPx = getRowTopPx(index, cargoGroup, pxPerMm);

    // Row height equals pallet length (visually rotated 90°)
    const rowHeightPx = Math.floor(palletLengthMm * pxPerMm);

    // Used to determine proximity to axles
    const rowCenterPx = rowTopPx + rowHeightPx / 2;

    // Determine color status for the row based on nearest axle
    const status: AxleStatus = isLoading ? 'loading' : getGroupStatus(rowCenterPx, axlesForRows);

    return {
      key: group.groupId,
      group,
      pxPerMm,
      status,
    };
  });
};
