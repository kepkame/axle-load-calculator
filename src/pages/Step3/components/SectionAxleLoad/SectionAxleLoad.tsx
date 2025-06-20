import IconDocument from '@assets/icons/document.svg?react';
import { LoadStatusTable } from '@components/Table/LoadStatusTable/LoadStatusTable';
import { Table } from '@components/Table/Table';
import { LoadStatusTableSkeleton } from '@components/Table/LoadStatusTable/LoadStatusTableSkeleton/LoadStatusTableSkeleton';
import { ReduxTruckVisualizer } from '@components/visualization/ReduxTruckVisualizer/ReduxTruckVisualizer';
import { useCalculateAxleLoadsQuery } from '@store/api/apiSlice';

import { Header } from './Header';
import { SectionAxleLoadProps } from './SectionAxleLoad.types';
import styles from './SectionAxleLoad.module.scss';

/**
 * Shows axle load diagram and table based on server-calculated data.
 */
export const SectionAxleLoad: React.FC<SectionAxleLoadProps> = ({ step1Data, step2Data }) => {
  const {
    data: rows = [],
    isLoading,
    error,
  } = useCalculateAxleLoadsQuery({ step1Data, step2Data });
  return (
    <section className={styles.section}>
      <Header />

      <div className={styles.media}>
        <ReduxTruckVisualizer
          truckAxles={step1Data.truckAxles}
          trailerAxles={step1Data.trailerAxles}
          rows={rows}
          loading={isLoading}
          formData={step1Data}
        />
      </div>

      {isLoading ? (
        <LoadStatusTableSkeleton />
      ) : (
        <Table>
          <LoadStatusTable rows={rows} step1Data={step1Data} step2Data={step2Data} />
        </Table>
      )}

      {error && <div className="error">Ошибка загрузки данных: {String(error)}</div>}

      <button className="btn btn--icon">
        <IconDocument className="icon" />
        Скачать отчёт в PDF
      </button>
    </section>
  );
};
