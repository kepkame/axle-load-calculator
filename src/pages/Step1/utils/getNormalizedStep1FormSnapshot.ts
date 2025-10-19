import type { UseFormReturn } from 'react-hook-form';
import type { AxleFieldArrayItem, FormSchemaType } from '@entities/step1Form/types';
import type { Step1Data } from '@shared-types/step1Data';

/**
 * Returns a normalized snapshot of the Step1 form:
 * - "axleLoadData" is rebuilt with preserved stable "axleId" values
 * - all other fields are taken directly from the form
 */
export function getNormalizedStep1FormSnapshot(
  methods: UseFormReturn<FormSchemaType>,
  fields: AxleFieldArrayItem[],
): Step1Data {
  const formArray = methods.getValues('axleLoadData') as Array<{
    axleType: 'truck' | 'trailer';
    axleLoadEmpty: number;
    axleLoadLimit: number;
    lifted: boolean;
  }>;

  // Rebuild "axleLoadData" with preserved axleId from field metadata
  const normalized = fields.map((fieldItem, index) => ({
    axleId: fieldItem.axleId,
    axleType: formArray[index].axleType,
    axleLoadEmpty: formArray[index].axleLoadEmpty,
    axleLoadLimit: formArray[index].axleLoadLimit,
    lifted: formArray[index].lifted,
  }));

  const { axleLoadData: _, ...rest } = methods.getValues();

  return {
    ...rest,
    axleLoadData: normalized,
  } as Step1Data;
}
