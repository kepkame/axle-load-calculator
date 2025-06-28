import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import { getAxleStatus } from '@utils/getLoadStatus';
import type { TruckVisualizationModel, AxleVisualizationModel } from '../TruckVisualizer/models';

/**
 * Maps backend axle load results to a visualization model for rendering.
 *
 * - Classifies each axle by load severity (success, warning, danger)
 * - Filters out any excess axles that don't match expected counts
 * - Returns a clean model ready for display in TruckAxleVisualizer
 */
export const createVisualizationModelFromRows = (params: {
  truckAxles: string;
  trailerAxles: string;
  rows: LoadStatusRow[];
}): TruckVisualizationModel => {
  const truckCount = parseInt(params.truckAxles);
  const trailerCount = parseInt(params.trailerAxles);

  // Generate an array of axles with lifted/status indicators
  let axles: AxleVisualizationModel[] = params.rows.map((row) => {
    const status = getAxleStatus(row.actualLoad, row.maxLoad);

    return {
      axleKey: row.axleKey,
      axleType: row.axleType,
      index: row.index,
      lifted: row.lifted ?? false,
      status,
    };
  });

  // Ensure the visual output doesn't include more axles than declared
  let truckAxles = axles.filter((a) => a.axleType === 'truck');
  let trailerAxles = axles.filter((a) => a.axleType === 'trailer');

  // Defensive: truncate if server returned more axles than form expects
  if (truckAxles.length > truckCount) {
    truckAxles = truckAxles.slice(0, truckCount);
  }
  if (trailerAxles.length > trailerCount) {
    trailerAxles = trailerAxles.slice(0, trailerCount);
  }

  const fixedAxles = [...truckAxles, ...trailerAxles];

  return {
    tractorAxles: truckCount,
    trailerAxles: trailerCount,
    axles: fixedAxles,
  };
};
