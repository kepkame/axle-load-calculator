import { z } from 'zod';
import { formCargoSchema } from './schema';

export type FormSchemaType = z.infer<ReturnType<typeof formCargoSchema>>;

export interface FormCargoContext {
  deckLength: number; // platform length in millimeters
}
