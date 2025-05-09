import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type { FormSchemaType } from '@entities/step1Form/types';

export interface ReduxTruckVisualizerProps {
  truckAxles: string;
  trailerAxles: string;
  rows: LoadStatusRow[];
  loading: boolean;
  formData: FormSchemaType;
}
