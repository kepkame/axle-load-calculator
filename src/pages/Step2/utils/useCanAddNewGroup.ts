import { useMemo } from 'react';
import { useWatch, Control } from 'react-hook-form';
import { PALLET_SIZES } from '@entities/step2Form/pallet/constants';
import { totalUsedLengthMM } from '@entities/step2Form/pallet/utils';
import { FormSchemaType } from '@entities/step2Form/types';

interface Params {
  control: Control<FormSchemaType>;
  deckLengthMM: number;
}

/**
 * Hook to determine whether a new cargo group can be added
 * based on the remaining available platform length.
 *
 * Prevents users from exceeding the deck length when adding new pallet groups.
 */
export const useCanAddNewGroup = ({ control, deckLengthMM }: Params): boolean => {
  // Watches the current cargo groups array from the form state
  const groups = useWatch({ control, name: 'cargoGroup' }) ?? [];

  return useMemo(() => {
    const used = totalUsedLengthMM(groups);
    const remaining = deckLengthMM - used;
    const minPalletLength = Math.min(...PALLET_SIZES.map((pallet) => pallet.length));

    // Checks if at least the smallest pallet can fit into the remaining space
    return PALLET_SIZES.some(
      (pallet) => remaining >= pallet.length && pallet.length >= minPalletLength,
    );
  }, [groups, deckLengthMM]);
};
