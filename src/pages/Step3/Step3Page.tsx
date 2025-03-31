import { useStepSync } from '@hooks/useStepSync';

const Step3Page: React.FC = () => {
  useStepSync(2);

  return <div>Step3Page</div>;
};

export default Step3Page;
