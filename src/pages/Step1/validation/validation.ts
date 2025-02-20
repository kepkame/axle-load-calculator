import { z } from 'zod';

export const formSchema = z.object({
  truckModel: z
    .string({
      required_error: 'Выберите модель тягача',
      invalid_type_error: 'Выберите корректную модель тягача',
    })
    .min(1, 'Выберите модель тягача')
    .refine(
      (val) =>
        [
          'kamaz_65115',
          'maz_6516',
          'scania_r420',
          'mercedes_actros',
          'man_tgs_18440',
          'volvo_fh16',
        ].includes(val),
      {
        message: 'Выберите корректную модель тягача',
      },
    ),

  truckWeight: z.coerce
    .number()
    .min(4800, 'Минимальное значение: 4800')
    .max(12000, 'Максимальное значение: 12 000'),

  truckWheelbase: z.coerce
    .number()
    .min(2.0, 'Минимальное значение: 2.0')
    .max(5.0, 'Максимальное значение: 5.0'),

  trailerWeight: z.coerce
    .number()
    .min(4000, 'Минимальное значение: 4000')
    .max(10000, 'Максимальное значение: 10 000'),

  trailerWheelbase: z.coerce
    .number()
    .min(1.0, 'Минимальное значение: 1.0')
    .max(3.0, 'Максимальное значение: 3.0'),
});
