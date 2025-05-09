import type { LoadStatusRow } from './LoadStatusTableRows/LoadStatusRow.types';
import type { FormSchemaType as Step1FormSchema } from '@entities/step1Form/types';
import type { FormSchemaType as Step2FormSchema } from '@entities/step2Form/types';

export interface LoadStatusTableProps {
  rows: LoadStatusRow[];
  step1Data: Step1FormSchema;
  step2Data: Step2FormSchema;
}
