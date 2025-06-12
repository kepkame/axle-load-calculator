import type { UseFormReturn } from 'react-hook-form';
import type {
  AxleFieldArrayItem,
  FormSchemaType,
  Step1FormNormalized,
} from '@entities/step1Form/types';

/**
 * Returns a normalized snapshot of the Step1 form:
 * - "axleLoadData" is rebuilt with preserved stable "axleId" values
 * - all other fields are taken directly from the form
 */
export function getNormalizedStep1FormSnapshot(
  methods: UseFormReturn<FormSchemaType>,
  fields: AxleFieldArrayItem[],
): Step1FormNormalized {
  const formArray = methods.getValues('axleLoadData') as Array<{
    axleType: 'truck' | 'trailer';
    axleLoadEmpty: number;
    axleLoadLimit: number;
    lifted: boolean;
  }>;

  // Rebuild "axleLoadData" with preserved axleId from field metadata
  const normalized = fields.map((fieldItem, idx) => ({
    axleId: fieldItem.axleId,
    axleType: formArray[idx].axleType,
    axleLoadEmpty: formArray[idx].axleLoadEmpty,
    axleLoadLimit: formArray[idx].axleLoadLimit,
    lifted: formArray[idx].lifted,
  }));

  const { axleLoadData: _, ...rest } = methods.getValues();

  return {
    ...rest,
    axleLoadData: normalized,
  } as Step1FormNormalized;
}
