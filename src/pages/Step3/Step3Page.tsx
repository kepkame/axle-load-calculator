import { useStepGuard } from '@hooks/useStepGuard';
import { useStepSync } from '@hooks/useStepSync';
import { selectStep2FormFilled } from '@store/slices/step2FormSlice/step2FormSlice.selectors';

const Step3Page = () => {
  useStepGuard({
    selector: selectStep2FormFilled,
    fallbackPath: '/step2',
  });
  useStepSync(2);

  return <div>Step3Page</div>;
};

export default Step3Page;
