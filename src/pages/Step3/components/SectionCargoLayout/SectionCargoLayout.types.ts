import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type { FormSchemaType as Step1FormData } from '@entities/step1Form/types';
import type { FormSchemaType as Step2FormData } from '@entities/step2Form/types';

export interface SectionCargoLayoutProps {
  step1Data: Step1FormData;
  step2Data: Step2FormData;
  rows: LoadStatusRow[];
  isLoading: boolean;
}
