import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useCalculateAxleLoadsQuery } from '@store/api/apiSlice';
import { selectStep1FormData } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { selectStep2FinalData } from '@store/slices/step2FormSlice/step2FormSlice.selectors';
import { useStepsGuard } from '@hooks/useStepsGuard';
import { useStepSync } from '@hooks/useStepSync';

import { ErrorWithRetry } from './components/ErrorWithRetry/ErrorWithRetry';
import { SectionAxleLoad } from './components/SectionAxleLoad/SectionAxleLoad';
import { SectionCargoLayout } from './components/SectionCargoLayout/SectionCargoLayout';

import styles from './Step3Page.module.scss';

/**
 * Final step of the wizard: shows calculated axle loads and cargo placement.
 *
 * Access is guarded: only available after steps 1 and 2 are both completed.
 * Handles API loading, error, and data states.
 */
const Step3Page = () => {
  // Syncs the stepper to highlight current step
  useStepSync(2);

  const isAllowed = useStepsGuard({ requireStep1: true, requireStep2: true });
  if (!isAllowed) return null;

  const step1Data = useSelector(selectStep1FormData);
  const step2Data = useSelector(selectStep2FinalData);

  // Fetches calculation results based on user input from prior steps.
  const {
    data: rows = [],
    isLoading,
    error,
    refetch,
  } = useCalculateAxleLoadsQuery({ step1Data, step2Data });

  useEffect(() => {
    if (!isLoading) {
      if (error) console.warn('[Step3Page] Ошибка API:', error);
    }
  }, [isLoading, error]);

  return (
    <>
      <h2 className={styles.stepTitle}>Размещение груза</h2>

      {error ? (
        <ErrorWithRetry error={error} onRetry={refetch} />
      ) : (
        <>
          <SectionAxleLoad
            step1Data={step1Data}
            step2Data={step2Data}
            rows={rows}
            isLoading={isLoading}
          />

          <SectionCargoLayout
            step1Data={step1Data}
            step2Data={step2Data}
            rows={rows}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default Step3Page;
