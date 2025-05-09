import { FormSchemaType as Step1FormData } from '@entities/step1Form/types';
import { FormSchemaType as Step2FormData } from '@entities/step2Form/types';

export interface LoadStatusTableFooterProps {
  step1Data: Step1FormData;
  step2Data: Step2FormData;
}
