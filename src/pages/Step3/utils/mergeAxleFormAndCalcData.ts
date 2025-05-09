import { FormSchemaType } from '@entities/step1Form/types';
import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import { generateAxleKeys } from '@pages/Step1/utils/generateAxleKeys';
import { AxleCalculationResult } from '@shared-types/axleCalculation';

/**
 * Combines axle calculation results with user-entered form data.
 *
 * Aligns entries by axleKey and returns LoadStatusRow[] for result rendering.
 */
export function mergeAxleFormAndCalcData(
  formData: FormSchemaType,
  apiData: AxleCalculationResult[],
): LoadStatusRow[] {
  // Generate keys in the same order as formData.axleLoadData
  const keys = generateAxleKeys({
    truckAxles: parseFloat(formData.truckAxles),
    trailerAxles: parseFloat(formData.trailerAxles),
  });

  // Map axleKey → form data entry for fast lookup
  const formMap = formData.axleLoadData.reduce<Record<string, (typeof formData.axleLoadData)[0]>>(
    (acc, item, idx) => {
      acc[keys[idx]] = item;
      return acc;
    },
    {},
  );

  // Merge form data with API data by axleKey
  return apiData.map(({ axleKey, axleType, index, actualLoad, lifted }) => {
    const formItem = formMap[axleKey];
    return {
      axleKey,
      axleType,
      index,
      actualLoad,
      maxLoad: formItem?.axleLoadLimit ?? 0,
      lifted,
    };
  });
}
