import { useSelector } from 'react-redux';

import { selectStep1FormData } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { selectStep2FormData } from '@store/slices/step2FormSlice/step2FormSlice.selectors';
import { SectionAxleLoad } from './components/SectionAxleLoad/SectionAxleLoad';
import { SectionCargoLayout } from './components/SectionCargoLayout/SectionCargoLayout';
import { useStepsGuard } from '@hooks/useStepsGuard';
import { useStepSync } from '@hooks/useStepSync';

import styles from './Step3Page.module.scss';
import { useCalculateAxleLoadsQuery } from '@store/api/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Step3Page – displays axle load results and cargo layout.
 * Accessible only after steps 1 and 2 are completed.
 */
const Step3Page = () => {
  // Syncs the stepper to highlight current step
  useStepSync(2);

  const isAllowed = useStepsGuard({ requireStep1: true, requireStep2: true });
  const step1Data = useSelector(selectStep1FormData);
  const step2Data = useSelector(selectStep2FormData);

  const { error, refetch } = useCalculateAxleLoadsQuery(
    { step1Data, step2Data },
    { skip: !isAllowed },
  );

  if (!isAllowed) return null;

  const fetchError = error as FetchBaseQueryError | undefined;
  const isHttpError =
    fetchError &&
    typeof fetchError.status === 'number' &&
    [400, 500].includes(fetchError.status as number);

  return (
    <>
      <h2 className={styles.stepTitle}>Размещение груза</h2>

      {isHttpError && (
        <div className={styles.errorContainer}>
          <p>
            При загрузке данных расчёта нагрузки произошла ошибка сервера (
            {fetchError.status as number}). Пожалуйста, попробуйте ещё раз.
          </p>
          <button className="btn" onClick={() => refetch()}>
            Повторить
          </button>
        </div>
      )}

      <SectionAxleLoad step1Data={step1Data} step2Data={step2Data} />

      <SectionCargoLayout
        deckLength={step1Data.deckLength}
        step1Data={step1Data}
        step2Data={step2Data}
      />
    </>
  );
};

export default Step3Page;
