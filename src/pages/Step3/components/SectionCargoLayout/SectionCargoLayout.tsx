import { TruckTopView } from '@components/visualization/TruckTopView/TruckTopView';
import type { SectionCargoLayoutProps } from './SectionCargoLayout.types';
import styles from './SectionCargoLayout.module.scss';

/**
 * SectionCargoLayout – renders a top-down view of the trailer
 * with pallets distributed across the deck based on axle load data.
 */
export const SectionCargoLayout: React.FC<SectionCargoLayoutProps> = ({
  step1Data,
  step2Data,
  rows,
  isLoading,
}) => {
  const hasRows = rows.length > 0;
  const showVisualization = isLoading || hasRows;
  let content: React.ReactNode;

  if (showVisualization) {
    content = <TruckTopView dataVehicle={step1Data} dataCargo={step2Data} dataResultCalc={rows} />;
  } else {
    content = <p>Ошибка: В полученных расчётах нет данных нагрузки осей.</p>;
  }

  return (
    <section>
      <h3 className={styles.title}>План размещения груза</h3>

      <div className={styles.description}>
        <p>Используйте план для равномерного распределения груза и предотвращения перегрузки.</p>
      </div>

      {content}
    </section>
  );
};
