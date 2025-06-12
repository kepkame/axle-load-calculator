import { AxleLoadDataItem } from '@entities/step1Form/types';

export interface AxleConfigSnapshot {
  truck: number;
  trailer: number;
}

// Cache type for storing axle data keyed by unique string identifiers
export type AxleCache = Record<string, AxleLoadDataItem>;
