import type { LoadStatusRow } from '@components/Table/LoadStatusTable/LoadStatusTableRows/LoadStatusRow.types';
import type {
  TruckVisualizationModel,
  AxleVisualizationModel,
  AxleStatus,
} from '../TruckVisualizer/models';

/**
 * Maps result rows to a visualization model with computed axle statuses.
 */
export function createVisualizationModelFromRows(params: {
  truckAxles: string;
  trailerAxles: string;
  rows: LoadStatusRow[];
}): TruckVisualizationModel {
  const truckCount = parseFloat(params.truckAxles);
  const trailerCount = parseFloat(params.trailerAxles);

  const axles: AxleVisualizationModel[] = params.rows.map((row) => {
    const pct = row.actualLoad / row.maxLoad;

    // Determines visual status based on load utilization
    let status: AxleStatus = 'success';
    if (pct > 1) status = 'danger';
    else if (pct >= 0.85) status = 'warning';

    return {
      axleKey: row.axleKey,
      axleType: row.axleType,
      index: row.index,
      lifted: row.lifted,
      status,
    };
  });

  return {
    tractorAxles: truckCount,
    trailerAxles: trailerCount,
    axles,
  };
}
