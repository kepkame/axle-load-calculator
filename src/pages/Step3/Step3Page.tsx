import { useSelector } from 'react-redux';

import { selectStep1FormData } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { selectStep2FormData } from '@store/slices/step2FormSlice/step2FormSlice.selectors';
import { SectionAxleLoad } from './components/SectionAxleLoad/SectionAxleLoad';
import { SectionCargoLayout } from './components/SectionCargoLayout/SectionCargoLayout';
import { useStepsGuard } from '@hooks/useStepsGuard';
import { useStepSync } from '@hooks/useStepSync';

import styles from './Step3Page.module.scss';

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

  if (!isAllowed) return null;

  return (
    <>
      <h2 className={styles.stepTitle}>Размещение груза</h2>

      <SectionAxleLoad step1Data={step1Data} step2Data={step2Data} />

      <SectionCargoLayout deckLength={step1Data.deckLength} />
    </>
  );
};

export default Step3Page;
