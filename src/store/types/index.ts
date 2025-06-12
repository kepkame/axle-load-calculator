import type { FormSchemaType as Step1FormData } from '@entities/step1Form/types';
import type { FormSchemaType as Step2FormData } from '@entities/step2Form/types';
import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';

// Parameters for POST /result
export interface CalculateAxleLoadsArgs {
  step1Data: Step1FormData;
  step2Data: Step2FormData;
}

// Response from POST /result after transformResponse
export type CalculateAxleLoadsResponse = LoadStatusRow[];
