import { PageHeader } from '@components/ui/PageHeader';
import { PurposeSection } from './components/PurposeSection/PurposeSection';
import { ProblemsSection } from './components/ProblemsSection/ProblemsSection';
import { BenefitsSection } from './components/BenefitsSection/BenefitsSection';
import { StepsOverviewSection } from './components/StepsOverviewSection/StepsOverviewSection';
import { DisclaimerSection } from './components/DisclaimerSection/DisclaimerSection';

const About = () => {
  return (
    <>
      <PageHeader title="О проекте" />
      <PurposeSection />
      <ProblemsSection />
      <BenefitsSection />
      <StepsOverviewSection />
      <DisclaimerSection />
    </>
  );
};

export default About;
