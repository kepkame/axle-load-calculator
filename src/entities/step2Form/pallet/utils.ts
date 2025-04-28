import { PalletSize, getPalletById } from './constants';

/**
 * Calculates the used platform length (in millimeters) for a given cargo group.
 *
 * Each row accommodates up to two pallets.
 *
 * @param palletId ID of the pallet size
 * @param quantity Number of pallets in the group
 * @returns Total length in millimeters occupied by the group
 */
export function usedLengthForGroupMM(palletId: PalletSize['id'], quantity: number): number {
  const { length } = getPalletById(palletId);
  const rows = Math.ceil(quantity / 2);
  return rows * length;
}

/**
 * Calculates the total used platform length (in millimeters) across multiple cargo groups.
 *
 * Aggregates the length occupied by all groups based on pallet size and quantity.
 *
 * @param groups List of cargo groups with pallet IDs and quantities
 * @returns Total used length in millimeters
 */
export function totalUsedLengthMM(groups: { palletId: PalletSize['id']; quantity: number }[]) {
  return groups.reduce((sum, g) => sum + usedLengthForGroupMM(g.palletId, g.quantity), 0);
}

/**
 * Calculates the maximum allowable quantity for each cargo group
 * based on remaining available platform length.
 *
 * Ensures that updated pallet quantities do not cause the total length
 * to exceed the platform capacity.
 *
 * @param deckLengthMM Total platform length in millimeters
 * @param groups List of cargo groups with pallet IDs and quantities
 * @returns Array of maximum allowed quantities for each group
 */
export function getMaxQuantities(
  deckLengthMM: number,
  groups: { palletId: PalletSize['id']; quantity: number }[],
): number[] {
  const usedTotal = totalUsedLengthMM(groups);

  return groups.map(({ palletId, quantity }) => {
    const pallet = getPalletById(palletId);
    const usedThis = usedLengthForGroupMM(palletId, quantity);
    const free = Math.max(deckLengthMM - (usedTotal - usedThis), 0);
    const maxRows = Math.floor(free / pallet.length);

    return maxRows * 2;
  });
}
