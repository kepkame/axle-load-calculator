import type { TrailerAxleCount, TruckAxleCount } from '@shared-constants/axleCounts';

export interface Step1Data {
  truckWeight: number;
  truckAxles: TruckAxleCount;
  truckWheelbase: number[];

  trailerWeight: number;
  trailerAxles: TrailerAxleCount;
  couplingLength: number;
  trailerWheelbase: number[];
  deckLength: number;

  axleLoadData: {
    axleId: string;
    axleType: 'truck' | 'trailer';
    axleLoadEmpty: number;
    axleLoadLimit: number;
    lifted: boolean;
  }[];
}
