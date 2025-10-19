/**
 * Axle load status used for coloring and state indication
 */
export type AxleStatus = 'success' | 'warning' | 'danger' | 'default' | 'loading' | 'out';

export type AxleStatusCore = Extract<AxleStatus, 'success' | 'warning' | 'danger'>;
