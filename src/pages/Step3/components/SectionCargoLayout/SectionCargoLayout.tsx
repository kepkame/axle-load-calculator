import { useCalculateAxleLoadsQuery } from '@store/api/apiSlice';
import type { FormSchemaType as Step1FormData } from '@entities/step1Form/types';
import type { FormSchemaType as Step2FormData } from '@entities/step2Form/types';

import styles from './SectionCargoLayout.module.scss';

interface SectionCargoLayoutProps {
  deckLength: number;
  step1Data: Step1FormData;
  step2Data: Step2FormData;
}

export const SectionCargoLayout: React.FC<SectionCargoLayoutProps> = ({
  deckLength,
  step1Data,
  step2Data,
}) => {
  const {
    data: rows = [],
    isLoading,
    error,
  } = useCalculateAxleLoadsQuery({ step1Data, step2Data });

  return (
    <section>
      <h3 className={styles.title}>План размещения груза</h3>

      <div>
        <p>Перемещайте, удаляйте паллеты или изменяйте их габариты и вес.</p>
        <p>Используйте план для равномерного распределения груза и предотвращения перегрузки.</p>
      </div>

      <p>deckLength = {deckLength}</p>

      <p>
        <strong>Загруженность расчётных осей:</strong>{' '}
        {isLoading ? 'Загрузка…' : rows.length > 0 ? `${rows.length} осей` : 'Нет данных'}
      </p>

      {error && (
        <p className={styles.errorMessage}>
          Ошибка загрузки данных: {String('status' in error ? error.status : error)}
        </p>
      )}
    </section>
  );
};
