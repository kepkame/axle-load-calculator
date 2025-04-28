export type PalletSizeId = 'EUR' | 'FIN' | 'SQUARE';

export interface PalletSize {
  id: PalletSizeId;
  value: string;
  label: string;
  length: number; // in millimeters
  width: number; // in millimeters
}

/**
 * Predefined list of pallet sizes used for cargo distribution validation
 * and UI selection options.
 */
export const PALLET_SIZES: PalletSize[] = [
  {
    id: 'EUR',
    value: '1200x1000',
    label: '1200×1000 мм',
    length: 1200,
    width: 1000,
  },
  {
    id: 'FIN',
    value: '1000x1200',
    label: '1000×1200 мм',
    length: 1000,
    width: 1200,
  },
  {
    id: 'SQUARE',
    value: '1050x1050',
    label: '1050×1050 мм',
    length: 1050,
    width: 1050,
  },
];

/**
 * Retrieves a pallet configuration by its ID.
 */
export function getPalletById(id: PalletSizeId): PalletSize {
  const p = PALLET_SIZES.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown pallet id "${id}"`);
  return p;
}
