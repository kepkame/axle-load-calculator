import { useMemo } from 'react';
import { useWatch, Control } from 'react-hook-form';
import { getMaxQuantities } from '@entities/step2Form/pallet/utils';
import type { FormSchemaType } from '@entities/step2Form/types';

interface UseAllQuantityConstraintsParams {
  control: Control<FormSchemaType>;
  deckLengthMM: number;
}

/**
 * Computes dynamic maximum quantity constraints for each cargo group
 * based on current platform length and pallet types.
 *
 * Used to ensure that pallet quantities stay within allowable limits
 * as users modify cargo data during form interaction.
 */
export const useAllQuantityConstraints = ({
  control,
  deckLengthMM,
}: UseAllQuantityConstraintsParams): number[] => {
  // Watches cargo group fields to react to pallet size or quantity changes
  const groups = useWatch({ control, name: 'cargoGroup' }) ?? [];

  return useMemo(() => getMaxQuantities(deckLengthMM, groups), [groups, deckLengthMM]);
};
