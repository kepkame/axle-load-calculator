import { getPalletById } from '@entities/step2Form/pallet/utils';
import type { CargoGroup } from '@entities/step2Form/types';

/** Calculates the combined length of all pallet groups (in px) to fit the trailer view */
export const calculateTrailerPalletLengthPx = (
  cargoGroup: CargoGroup[],
  pxPerMm: number,
): number => {
  // Sum the length (mm) of all pallet groups, regardless of their position in the trailer
  const totalLengthMm = cargoGroup.reduce((sum, cargo) => {
    const pallet = getPalletById(cargo.palletId);
    return sum + pallet.length;
  }, 0);

  const totalLengthPx = totalLengthMm * pxPerMm;

  // Use Math.ceil to avoid accidental UI overflow due to subpixel rounding
  return Math.ceil(totalLengthPx);
};
