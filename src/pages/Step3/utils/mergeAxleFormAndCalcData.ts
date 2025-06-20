import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type { FormSchemaType } from '@entities/step1Form/types';
import { generateAxleKeys } from '@utils/generateAxleKeys';
import type { AxleCalculationResult } from '@shared-types/axleCalculation';

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
    truckAxles: parseInt(formData.truckAxles),
    trailerAxles: parseInt(formData.trailerAxles),
  });

  // Map axleKey → form data entry for fast lookup
  const formMap = formData.axleLoadData.reduce<Record<string, (typeof formData.axleLoadData)[0]>>(
    (acc, item, index) => {
      acc[keys[index]] = item;
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
