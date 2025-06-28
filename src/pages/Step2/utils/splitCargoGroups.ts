import { CargoGroup } from '@entities/step2Form/types';

/**
 * Splits each pallet group into subgroups of 1–2 pallets,
 * reassigning groupId using sequential numbering starting from 1.
 *
 * The original array is not mutated. The order of groups is preserved.
 */
export function splitCargoGroups(groups: CargoGroup[]): CargoGroup[] {
  const splitGroups = groups.flatMap((group) => {
    const validQuantity = Math.max(0, Math.floor(group.quantity));

    if (validQuantity === 0) {
      console.warn(`Group with groupId=${group.groupId} has zero quantity and was skipped`);
    }

    return Array.from({ length: Math.ceil(validQuantity / 2) }, (_, index) => {
      const remaining = validQuantity - index * 2;
      const subQuantity = remaining >= 2 ? 2 : 1;

      return {
        ...group,
        quantity: subQuantity,
      };
    });
  });

  return splitGroups.map((group, index) => ({
    ...group,
    groupId: index + 1,
  }));
}
