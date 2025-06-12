/** Axle load status used for coloring and state indication */
export type AxleStatus = 'default' | 'success' | 'warning' | 'danger' | 'loading';

/** Describes a single axle in the visualization model */
export interface AxleVisualizationModel {
  axleKey: string; // Unique key for React rendering
  axleType: 'truck' | 'trailer';
  index: number; // Position in axle sequence
  lifted: boolean;
  status?: AxleStatus; // Visual state indicator
}

/**
 * Unified model for rendering truck axle configurations.
 * Used across form, Redux, and API-driven contexts.
 */
export interface TruckVisualizationModel {
  tractorAxles: number; // Count of tractor axles
  trailerAxles: number; // Count of trailer axles
  axles: AxleVisualizationModel[]; // Visual metadata for all axles
}

/** Raw axle load input used for model creation */
export interface AxleLoadInfo {
  axleType: 'truck' | 'trailer';
  loadEmpty?: number;
  loadLimit?: number;
  lifted: boolean;
}
