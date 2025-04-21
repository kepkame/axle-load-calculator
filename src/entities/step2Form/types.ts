import { z } from 'zod';
import { formCargoSchema } from './schema';

export type FormSchemaType = z.infer<typeof formCargoSchema>;
