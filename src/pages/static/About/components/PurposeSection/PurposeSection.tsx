import { AboutSection } from '../AboutSection/AboutSection';

export const PurposeSection: React.FC = () => {
  return (
    <AboutSection>
      <h3>Назначение</h3>
      <p>
        Калькулятор нагрузки на оси предназначен для предварительного расчёта распределения груза по
        осям тягача и полуприцепа. Основная цель – упростить планирование размещения паллет в
        полуприцепе и сократить вероятность перегруза.
      </p>
    </AboutSection>
  );
};
