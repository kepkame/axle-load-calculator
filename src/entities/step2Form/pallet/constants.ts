import { PalletSize } from '../types';

/**
 * Predefined list of pallet sizes used for cargo distribution validation
 * and UI selection options.
 */
export const PALLET_SIZES: PalletSize[] = [
  {
    id: 'EUR',
    value: '1200x1000',
    label: '1200×1000мм.',
    length: 1200,
    width: 1000,
  },
  {
    id: 'FIN',
    value: '1000x1200',
    label: '1000×1200мм.',
    length: 1000,
    width: 1200,
  },
  {
    id: 'SQUARE',
    value: '1050x1050',
    label: '1050×1050мм.',
    length: 1050,
    width: 1050,
  },
];
