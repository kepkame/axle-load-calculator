import { useCallback } from 'react';
import { OptionSelector } from '@components/ui/ValueSelector/ValueSelector.types';

export const usePresetTruckValues = () => {
  const applyPresetTruckValues = useCallback((option: OptionSelector) => {
    console.log('Applying preset values for truck:', option);
    // TODO: Implement logic to update form values
  }, []);

  return { applyPresetTruckValues };
};
