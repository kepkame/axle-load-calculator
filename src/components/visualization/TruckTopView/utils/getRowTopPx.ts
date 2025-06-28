import { getPalletById } from '@entities/step2Form/pallet/utils';
import type { CargoGroup } from '@entities/step2Form/types';

/**
 * Calculates top offset in px for a pallet row in the trailer,
 * taking into account trailer border and stacked row heights.
 */
export const getRowTopPx = (
  groupIndex: number,
  cargoGroup: CargoGroup[],
  pxPerMm: number,
): number => {
  const trailerBorderTopPx = 4; // Sync with .trailer border-top in CSS
  let offset = trailerBorderTopPx;

  // Accumulate heights of all previous pallet groups
  for (let i = 0; i < groupIndex; i++) {
    const { length: palletLengthMm } = getPalletById(cargoGroup[i].palletId);

    // Rounding down to avoid 1px overflow from floating point math
    const lengthPx = Math.floor(palletLengthMm * pxPerMm);
    offset += lengthPx;
  }

  return offset;
};
