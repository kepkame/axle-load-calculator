import { Cards } from '@components/ui/Cards/Cards';
import { AboutSection } from '../AboutSection/AboutSection';

const DATA_LIST = [
  {
    description: ['Упрощает расчёт нагрузки на оси без использования формул и таблиц.'],
  },
  {
    description: ['Позволяет быстро оценить, как размещение груза повлияет на осевую нагрузку.'],
  },
  {
    description: ['Помогает избежать лишних перегрузок и нарушений при контроле на дорогах.'],
  },
  {
    description: ['Удобен при работе с типовыми паллетами и стандартными схемами размещения.'],
  },
];

export const ProblemsSection: React.FC = () => {
  return (
    <AboutSection>
      <h3>Какие задачи решает</h3>
      <Cards data={DATA_LIST} />
    </AboutSection>
  );
};
