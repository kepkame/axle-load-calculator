{
  /* TODO: Add a “formSchema” using Zod for the cargo characteristics form */
}
import { z } from 'zod';

export const formCargoSchema = z.object({
  cargoGroup: z.array(
    z.object({
      dimensions: z.string(),
      weight: z.coerce.number().min(1).max(1200),
      quantity: z.coerce.number().min(1).max(100),
    }),
  ),
});
