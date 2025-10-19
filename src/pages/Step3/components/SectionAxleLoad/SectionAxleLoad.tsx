import IconDownload from '@assets/icons/download.svg?react';
import IconLoader from '@assets/icons/loader.svg?react';
import { Table } from '@components/Table/Table';
import { LoadStatusTableSkeleton } from '@components/Table/LoadStatusTable/LoadStatusTableSkeleton/LoadStatusTableSkeleton';
import { ReduxTruckVisualizer } from '@components/visualization/ReduxTruckVisualizer/ReduxTruckVisualizer';
import { LoadStatusTable } from '@components/Table/LoadStatusTable/LoadStatusTable';
import { usePdfReport } from '@features/pdfReport/usePdfReport';

import { Header } from './Header';
import type { SectionAxleLoadProps } from './SectionAxleLoad.types';
import styles from './SectionAxleLoad.module.scss';

/**
 * Displays the axle load diagram (top part), status table (below), and a PDF download button.
 *
 * Responsibilities:
 * - Visualize computed axle loads.
 * - Display summary table per axle.
 * - Allow user to download a well-formatted PDF report.
 * - Gracefully handle loading and empty states.
 */
export const SectionAxleLoad: React.FC<SectionAxleLoadProps> = ({
  step1Data,
  step2Data,
  rows = [],
  isLoading,
  cargoPlanRef,
}) => {
  const hasRows = rows.length > 0;
  const showSkeleton = isLoading;
  const showEmpty = !hasRows && !isLoading;

  // Clone Step 1 data with explicit and consistent axle identifiers.
  const pdfStep1Data = {
    ...step1Data,
    axleLoadData: step1Data.axleLoadData.map((axle, index) => ({
      ...axle,
      axleId: `axle-${index}`,
      axleType: axle.axleType ?? (index < Number(step1Data.truckAxles) ? 'truck' : 'trailer'),
    })),
  };

  // Integrate PDF report hook.
  const { isBuilding, buildAndDownload } = usePdfReport({
    step1Data: pdfStep1Data,
    rows,
    getCargoPlanElement: () => cargoPlanRef?.current ?? null,
    snapshot: { width: 380, scale: 2 },
  });

  // Button state control to prevent unwanted multiple triggers.
  const isDisabled = isBuilding || !hasRows;

  const handleDownload = async () => {
    if (isDisabled) return;
    try {
      await buildAndDownload();
    } catch (err) {
      // Error is intentionally swallowed — handled internally by usePdfReport.
    }
  };

  // UI composition for dynamic button icon and label.
  const buttonLabel = isBuilding ? 'Формирование PDF…' : 'Скачать отчёт в PDF';
  const Icon = isBuilding ? IconLoader : IconDownload;
  const iconClass = isBuilding ? 'icon icon--rotating' : 'icon';

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
        <button
          type="button"
          className="btn btn--icon"
          disabled={isDisabled}
          onClick={handleDownload}
          aria-label={buttonLabel}
        >
          <Icon className={iconClass} />
          {buttonLabel}
        </button>
      )}
    </section>
  );
};
