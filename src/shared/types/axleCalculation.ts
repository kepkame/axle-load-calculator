/** The axle load calculation results obtained from the backend */
export interface AxleCalculationResult {
  axleKey: string;
  axleType: 'truck' | 'trailer';
  index: number;
  actualLoad: number;
  maxLoad: number;
  lifted?: boolean;
}
