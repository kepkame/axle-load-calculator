export enum AxleLoadStatus {
  Default = '#FFFFFF',
  Success = '#8CE49F',
  Warning = '#F9CF7C',
  Danger = '#F9867C',
}

export interface IAxlesProps {
  axleCount?: number;
  status?: AxleLoadStatus;
}

export type TractorAxleCount = 2 | 2.5 | 3;
export type TrailerAxleCount = 2 | 3 | 4;
