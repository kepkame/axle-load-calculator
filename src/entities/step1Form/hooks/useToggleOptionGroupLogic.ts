import { Control, UseFieldArrayUpdate, useWatch } from 'react-hook-form';
import { getActualIndices, getSelectedRelative } from './../utils/liftedAxleUtils';
import type { AxleFieldArrayItem, FormSchemaType } from '@entities/step1Form/types';

interface UseToggleOptionGroupLogicParams {
  fields: AxleFieldArrayItem[];
  control: Control<FormSchemaType>;
  update: UseFieldArrayUpdate<FormSchemaType, 'axleLoadData'>;
  axleType: 'truck' | 'trailer';
  axleCount: number;
}

/**
 * Provides selection logic for a group of toggleable buttons,
 * allowing exactly one lifted axle (or none) to be selected.
 */
export const useToggleOptionGroupLogic = ({
  fields,
  control,
  update,
  axleType,
  axleCount,
}: UseToggleOptionGroupLogicParams) => {
  const axleData =
    useWatch({
      control,
      name: 'axleLoadData',
    }) ?? [];

  const actualIndices = getActualIndices(fields, axleType, axleCount);
  const selectedRelative = getSelectedRelative(actualIndices, fields);

  /**
   * Toggles the lifted state for a given relative index:
   * - If it's already selected - unlift it.
   * - If a different one is selected - unlift the previous and lift the new one.
   */
  const handleToggle = (relIndex: number) => {
    const globalIndex = actualIndices[relIndex];

    if (selectedRelative === relIndex) {
      update(globalIndex, { ...axleData[globalIndex], lifted: false });
      return;
    }

    if (selectedRelative !== -1) {
      const prevGlobal = actualIndices[selectedRelative];
      update(prevGlobal, { ...axleData[prevGlobal], lifted: false });
    }

    update(globalIndex, { ...axleData[globalIndex], lifted: true });
  };

  return { actualIndices, selectedRelative, handleToggle };
};
