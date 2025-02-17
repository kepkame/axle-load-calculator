import { z } from 'zod';

export const formSchema = z.object({
  truckWeight: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(4800, 'Минимальное значение: 4800').max(12000, 'Максимальное значение: 12 000')),
  truckWheelbase: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(2.0, 'Минимальное значение: 2.0').max(5.0, 'Максимальное значение: 5.0')),
  trailerWeight: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(4000, 'Минимальное значение: 4000').max(10000, 'Максимальное значение: 10 000')),
  trailerWheelbase: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  }, z.number({ required_error: 'Поле обязательно для заполнения' }).min(1.0, 'Минимальное значение: 1.0').max(3.0, 'Максимальное значение: 3.0')),
});
