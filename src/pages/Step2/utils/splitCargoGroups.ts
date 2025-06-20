import type { PalletSizeId } from '@entities/step2Form/pallet/constants';

export interface CargoGroup {
  groupId: number;
  palletId: PalletSizeId;
  weight: number;
  quantity: number;
}

/**
 * Разбивает каждую группу паллет на подгруппы по 1–2 паллеты,
 * перенумеровывая groupId сквозной нумерацией с 1.
 *
 * Исходный массив не мутируется. Порядок групп сохраняется.
 *
 * @param groups Массив исходных групп паллет
 * @returns Новый массив групп с quantity ≤ 2 и пересозданными groupId
 */
export function splitCargoGroups(groups: CargoGroup[]): CargoGroup[] {
  const result: CargoGroup[] = [];
  let newGroupId = 1;

  for (const group of groups) {
    let remaining = group.quantity;

    while (remaining > 0) {
      const take = remaining >= 2 ? 2 : 1;

      result.push({
        palletId: group.palletId,
        weight: group.weight,
        quantity: take,
        groupId: newGroupId,
      });

      newGroupId += 1;
      remaining -= take;
    }
  }

  return result;
}
