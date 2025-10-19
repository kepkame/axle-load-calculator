import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type { AxleStatus } from '@shared-types/loadStatus';
import type { FormSchemaType as Step1FormData } from '@entities/step1Form/types';
import type { FormSchemaType as Step2FormData } from '@entities/step2Form/types';

export interface TruckTopViewProps {
  dataVehicle: Step1FormData;
  dataCargo: Step2FormData;
  dataResultCalc: LoadStatusRow[];
}

export interface AxlesProps {
  resultCCalc: LoadStatusRow[];
}

export interface TrailerAxleVisualData {
  yPx: number;
  isLifted: boolean;
  statusClass: AxleStatus;
  axleIndex: number;
  axleId: string;
}

export interface AxleCoord {
  yPx: number;
  status: AxleStatus;
}
