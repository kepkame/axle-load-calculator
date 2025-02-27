import { z } from 'zod';

export const formSchema = z.object({
  truckWeight: z.coerce
    .number()
    .min(4800, 'Минимальное значение: 4800')
    .max(12000, 'Максимальное значение: 12 000'),

  truckAxles: z.string().min(1, 'Укажите количество осей'),

  truckWheelbase: z.coerce
    .number()
    .min(2.0, 'Минимальное значение: 2.0')
    .max(5.0, 'Максимальное значение: 5.0'),

  trailerWeight: z.coerce
    .number()
    .min(4000, 'Минимальное значение: 4000')
    .max(10000, 'Максимальное значение: 10 000'),

  trailerAxles: z.string().min(1, 'Укажите количество осей'),

  couplingLength: z.string().min(1, 'Укажите длину сцепного устройства'),

  trailerWheelbase: z.coerce
    .number()
    .min(1.0, 'Минимальное значение: 1.0')
    .max(3.0, 'Максимальное значение: 3.0'),

  deckLength: z.coerce
    .number()
    .min(6, 'Минимальное значение: 6.0')
    .max(14, 'Максимальное значение: 14.0'),
});
