import { z } from 'zod';

export const formSchema = z.object({
  truckWeight: z.coerce
    .number()
    .min(4800, 'введи значение от 4 800')
    .max(12000, 'введи значение оси до 12 000'),

  truckAxles: z.string().min(1, 'Укажите количество осей'),

  truckWheelbase: z.coerce
    .number()
    .min(2.0, 'введи значение от 2.0')
    .max(5.0, 'введи значение до 5.0'),

  trailerWeight: z.coerce
    .number()
    .min(4000, 'введи значение  от 4 000')
    .max(10000, 'введи значение до 10 000'),

  trailerAxles: z.string().min(1, 'Укажите количество осей'),

  couplingLength: z.string().min(1, 'Укажите длину сцепного устройства'),

  trailerWheelbase: z.coerce
    .number()
    .min(1.0, 'введи значение  от 1.0')
    .max(3.0, 'введи значение до 3.0'),

  deckLength: z.coerce.number().min(6, 'введи значение  от 6.0').max(14, 'введи значение до 14.0'),

  axleLoadData: z.array(
    z
      .object({
        axleType: z.string().optional(),
        axleLoadEmpty: z.coerce
          .number()
          .min(1, 'введи значение  от 1.00')
          .max(40, 'введи значение до 40.00'),
        axleLoadLimit: z.coerce
          .number()
          .min(4, 'введи значение  от 4.00')
          .max(50, 'введи значение до 50.00'),
        lifted: z.boolean().optional(),
      })
      .refine((data) => data.axleLoadEmpty < data.axleLoadLimit, {
        message: 'должно быть меньше максимальной нагрузки',
        path: ['axleLoadLimit'],
      }),
  ),
});
