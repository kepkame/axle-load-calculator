import type { CargoGroup } from '@entities/step2Form/types';
import type { AxleStatus } from '@shared-types/loadStatus';

export interface PalletProps {
  weight: number;
  pxPerMm: number;
  label: string;
  width: number;
  length: number;
  status: AxleStatus;
}

export interface PalletsGroupProps {
  group: CargoGroup;
  pxPerMm: number;
  status: AxleStatus;
}
