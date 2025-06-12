import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type {
  TruckVisualizationModel,
  AxleVisualizationModel,
  AxleStatus,
} from '../TruckVisualizer/models';

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
  const truckCount = parseFloat(params.truckAxles);
  const trailerCount = parseFloat(params.trailerAxles);

  // Generate an array of axles with lifted/status indicators
  let axles: AxleVisualizationModel[] = params.rows.map((row) => {
    const pct = row.actualLoad / row.maxLoad;

    let status: AxleStatus = 'success';
    if (pct > 1) status = 'danger'; // Overloaded
    else if (pct >= 0.85) status = 'warning'; // Near limit

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
