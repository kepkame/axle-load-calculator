import { z } from 'zod';
import { getPalletById } from './pallet/constants';
import { getMaxQuantities, totalUsedLengthMM, usedLengthForGroupMM } from './pallet/utils';

export const cargoGroupSchema = z.object({
  groupId: z.number().int().min(1, 'Неправильный идентификатор группы'),
  palletId: z.enum(['EUR', 'FIN', 'SQUARE'] as const),
  weight: z.coerce
    .number()
    .min(100, 'Введите значение от 100')
    .max(1500, 'Введите значение до 1 500'),
  quantity: z.coerce.number().min(1),
});

export const formCargoSchema = (deckLengthMM: number) => {
  return z
    .object({
      cargoGroup: z.array(cargoGroupSchema),
    })
    .superRefine((data, ctx) => {
      // Skip validation if deck length is invalid or undefined
      if (deckLengthMM <= 0) return;

      const groups = data.cargoGroup;
      const maxQuantities = getMaxQuantities(deckLengthMM, groups);
      const totalUsed = totalUsedLengthMM(groups);

      groups.forEach((group, index) => {
        const { palletId, quantity } = group;

        // Validate that total pallet length does not exceed platform length
        if (totalUsed > deckLengthMM) {
          const freeLength = Math.max(
            deckLengthMM - (totalUsed - usedLengthForGroupMM(palletId, quantity)),
            0,
          );
          const allowed = Math.floor(freeLength / getPalletById(palletId).length) * 2;

          if (quantity > allowed) {
            ctx.addIssue({
              path: ['cargoGroup', index, 'quantity'],
              code: z.ZodIssueCode.custom,
              message: `Сумма длины всех паллет ${Math.ceil(
                totalUsed / 1000,
              )}м. превышает длину платформы ${deckLengthMM / 1000}м. Уменьшите количество паллет.`,
            });
            return;
          }
        }

        // Validate that group's quantity does not exceed calculated maximum
        if (quantity > maxQuantities[index]) {
          ctx.addIssue({
            path: ['cargoGroup', index, 'quantity'],
            code: z.ZodIssueCode.custom,
            message: `Максимально допустимое количество: ${maxQuantities[index]} шт.`,
          });
        }
      });
    });
};
