import { z } from 'zod';
import { ALLOWED_TRUCK_AXLES, ALLOWED_TRAILER_AXLES } from '@shared-constants/axleCounts';

export const formSchema = z.object({
  truckWeight: z.coerce
    .number()
    .min(4800, 'Введите значение от 4 800')
    .max(12000, 'Введите значение оси до 12 000'),

  truckAxles: z.enum(ALLOWED_TRUCK_AXLES, {
    required_error: 'Укажите количество осей',
  }),

  truckWheelbase: z
    .array(
      z.coerce.number().min(1.0, 'Введите значение от 1.0').max(4.0, 'Введите значение до 4.0'),
    )
    .min(1, 'Укажите расстояние минимум для одной пары осей'),

  trailerWeight: z.coerce
    .number()
    .min(4000, 'Введите значение от 4 000')
    .max(10000, 'Введите значение до 10 000'),

  trailerAxles: z.enum(ALLOWED_TRAILER_AXLES, {
    required_error: 'Укажите количество осей',
  }),

  couplingLength: z.coerce
    .number()
    .min(1.1, 'Введите значение от 1.10')
    .max(1.9, 'Введите значение до 1.90'),

  trailerWheelbase: z
    .array(
      z.coerce.number().min(1.0, 'Введите значение от 1.0').max(4.0, 'Введите значение до 4.0'),
    )
    .min(1, 'Укажите расстояние минимум для одной пары осей'),

  deckLength: z.coerce
    .number()
    .min(6, 'Введите значение от 6.0')
    .max(14, 'Введите значение до 14.0'),

  axleLoadData: z.array(
    z
      .object({
        axleType: z.enum(['truck', 'trailer']).optional(),
        axleLoadEmpty: z.coerce
          .number()
          .min(0, 'Введите значение от 0.00')
          .max(40, 'Введите значение до 40.00'),
        axleLoadLimit: z.coerce
          .number()
          .min(4, 'Введите значение от 4.00')
          .max(50, 'Введите значение до 50.00'),
        lifted: z.boolean(),
      })
      .refine((data) => data.axleLoadEmpty < data.axleLoadLimit, {
        message: 'Должно быть меньше максимальной нагрузки',
        path: ['axleLoadLimit'],
      }),
  ),
});
