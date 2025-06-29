import { Cards } from '@components/ui/Cards/Cards';
import { AboutSection } from '../AboutSection/AboutSection';

const DATA_LIST = [
  {
    title: 'Водителям фур',
    description: [
      'Быстрый предварительный расчёт нагрузки на каждую ось без подключения внешних приборов, возможность оперативно скорректировать план загрузки.',
    ],
  },
  {
    title: 'Водителям погрузчиков',
    description: [
      'Визуальное отображение паллет и их параметров позволяет точно позиционировать груз и минимизировать перераспределение на складе.',
    ],
  },
  {
    title: 'Складским менеджерам',
    description: [
      'Для оценки зентрализованная оценка использования паллетного пространства и упрощённое документирование (экспорт в PDF).',
    ],
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <AboutSection>
      <h3>Выгоды от использования</h3>
      <Cards data={DATA_LIST} />
    </AboutSection>
  );
};
