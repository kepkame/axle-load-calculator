import { useStepSync } from '@hooks/useStepSync';
// import store from '@store/index';

const Step2Page: React.FC = () => {
  useStepSync(1);

  return <div>Step2Page</div>;
};

export default Step2Page;
