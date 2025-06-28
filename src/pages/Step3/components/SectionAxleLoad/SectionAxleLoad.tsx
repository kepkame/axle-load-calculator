import IconDocument from '@assets/icons/document.svg?react';
import { LoadStatusTable } from '@components/Table/LoadStatusTable/LoadStatusTable';
import { Table } from '@components/Table/Table';
import { LoadStatusTableSkeleton } from '@components/Table/LoadStatusTable/LoadStatusTableSkeleton/LoadStatusTableSkeleton';
import { ReduxTruckVisualizer } from '@components/visualization/ReduxTruckVisualizer/ReduxTruckVisualizer';

import { Header } from './Header';
import type { SectionAxleLoadProps } from './SectionAxleLoad.types';
import styles from './SectionAxleLoad.module.scss';

/**
 * Displays the axle load diagram (top part), status table (below), and a PDF download button.
 *
 * Main responsibilities:
 * - Visualizes the calculated axle loads using a schematic diagram.
 * - Shows a summary table with per-axle status.
 * - Handles loading and empty states gracefully for a smoother UX.
 */
export const SectionAxleLoad: React.FC<SectionAxleLoadProps> = ({
  step1Data,
  step2Data,
  rows = [],
  isLoading,
}) => {
  const hasRows = rows.length > 0;
  const showSkeleton = isLoading;
  const showEmpty = !hasRows && !isLoading;

  return (
    <section className={styles.section}>
      <Header />

      {(showSkeleton || hasRows) && (
        <div className={styles.media}>
          <ReduxTruckVisualizer
            truckAxles={step1Data.truckAxles}
            trailerAxles={step1Data.trailerAxles}
            rows={rows}
            loading={isLoading}
            formData={step1Data}
          />
        </div>
      )}

      {showSkeleton && <LoadStatusTableSkeleton />}

      {hasRows && (
        <Table>
          <LoadStatusTable rows={rows} step1Data={step1Data} step2Data={step2Data} />
        </Table>
      )}

      {showEmpty && (
        <p className={styles.errorMessage}>Ошибка: отсутствуют расчёты нагрузки на оси.</p>
      )}

      {hasRows && (
        <button className="btn btn--icon" disabled={!hasRows}>
          <IconDocument className="icon" />
          Скачать отчёт в PDF
        </button>
      )}
    </section>
  );
};
