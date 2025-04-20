export type AxleTypeStrict = 'truck' | 'trailer';

export interface AxleLoadBusinessItem {
  axleType: AxleTypeStrict;
  axleLoadEmpty: number;
  axleLoadLimit: number;
  lifted?: boolean;
}
