import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@store/index';
import {
  selectAxleRows,
  selectAxleLoading,
} from '@store/slices/step3FormSlice/step3FormSlice.selectors';
import { fetchAxleLoads } from '@store/slices/step3FormSlice/step3FormSlice';
import IconDocument from '@assets/icons/document.svg?react';
import { LoadStatusTable } from '@components/Table/LoadStatusTable/LoadStatusTable';
import { Table } from '@components/Table/Table';
import { LoadStatusTableSkeleton } from '@components/Table/LoadStatusTable/LoadStatusTableSkeleton/LoadStatusTableSkeleton';
import { ReduxTruckVisualizer } from '@components/visualization/ReduxTruckVisualizer/ReduxTruckVisualizer';

import { Header } from './Header';
import { SectionAxleLoadProps } from './SectionAxleLoad.types';
import styles from './SectionAxleLoad.module.scss';

/**
 * SectionAxleLoad – shows axle load diagram and table based on server-calculated data.
 */
export const SectionAxleLoad: React.FC<SectionAxleLoadProps> = ({ step1Data, step2Data }) => {
  const dispatch = useAppDispatch();

  // Selects axle load data and loading state from Redux
  const rows = useSelector(selectAxleRows);
  const loading = useSelector(selectAxleLoading);

  // Triggers data fetch when the component mounts or form data changes
  useEffect(() => {
    dispatch(fetchAxleLoads());
  }, [dispatch, step1Data]);

  return (
    <section className={styles.section}>
      <Header />

      <div className={styles.media}>
        <ReduxTruckVisualizer
          truckAxles={step1Data.truckAxles}
          trailerAxles={step1Data.trailerAxles}
          rows={rows}
          loading={loading}
          formData={step1Data}
        />
      </div>

      {loading ? (
        <LoadStatusTableSkeleton />
      ) : (
        <Table>
          <LoadStatusTable rows={rows} step1Data={step1Data} step2Data={step2Data} />
        </Table>
      )}

      <button className="btn btn--icon">
        <IconDocument className="icon" />
        Скачать отчёт в PDF
      </button>
    </section>
  );
};
