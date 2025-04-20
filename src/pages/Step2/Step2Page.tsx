import { useSelector } from 'react-redux';
import { useStepSync } from '@hooks/useStepSync';
import { selectStep1FormData } from '@store/slices/step1FormSlice/step1FormSlice.selectors';

// import store from '@store/index';

const Step2Page: React.FC = () => {
  useStepSync(1);

  const step1Data = useSelector(selectStep1FormData);
  const deckLength = step1Data.deckLength;

  return (
    <div>
      Step2Page
      <h2>Step 2: Длина платформы ({deckLength})</h2>
    </div>
  );
};

export default Step2Page;
