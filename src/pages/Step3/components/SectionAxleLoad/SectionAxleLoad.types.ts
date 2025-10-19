import type { FormSchemaType as Step1FormData } from '@entities/step1Form/types';
import type { FormSchemaType as Step2FormData } from '@entities/step2Form/types';
import type { LoadStatusRow } from '@features/pdfReport/types';

export interface SectionAxleLoadProps {
  step1Data: Step1FormData;
  step2Data: Step2FormData;
  rows: LoadStatusRow[];
  isLoading: boolean;
  cargoPlanRef?: React.RefObject<HTMLDivElement>;
}
