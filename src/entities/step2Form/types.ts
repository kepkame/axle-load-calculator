import { z } from 'zod';
import { formCargoSchema } from './schema';

export type FormSchemaType = z.infer<ReturnType<typeof formCargoSchema>>;

export interface FormCargoContext {
  deckLength: number; // platform length in millimeters
}

export type PalletSizeId = 'EUR' | 'FIN' | 'SQUARE';

export interface PalletSize {
  id: PalletSizeId;
  value: string;
  label: string;
  length: number; // in millimeters
  width: number; // in millimeters
}

export interface CargoGroup {
  groupId: number;
  palletId: PalletSizeId;
  weight: number;
  quantity: number;
}
