import { z } from 'zod';
import { FieldArrayWithId } from 'react-hook-form';
import { TrailerAxleCount, TruckAxleCount } from '@shared-constants/axleCounts';
import { formSchema } from './schema';

export type FormSchemaType = z.infer<typeof formSchema>;

export type FormContext = unknown;

export interface Step1FormNormalized {
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

// Represents a single item from the 'axleLoadData' field array,
// including the internal 'id' added by useFieldArray.
export type AxleFieldArrayItemBase = FieldArrayWithId<FormSchemaType, 'axleLoadData'>;
export type AxleFieldArrayItem = AxleFieldArrayItemBase & {
  axleId: string;
};

// Type for a single element of the axleLoadData array
export type AxleLoadDataItem = {
  axleId: string;
  axleType: 'truck' | 'trailer';
  axleLoadEmpty: number;
  axleLoadLimit: number;
  lifted: boolean;
};

export interface Step1FormApiPayload {
  truckAxles: string;
  trailerAxles: string;
  axleLoadData: {
    axleType: 'truck' | 'trailer';
    axleLoadEmpty?: number;
    axleLoadLimit?: number;
    lifted: boolean;
  }[];
}
