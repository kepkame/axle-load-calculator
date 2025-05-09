import styles from './SectionCargoLayout.module.scss';

interface SectionCargoLayoutProps {
  deckLength: number;
}

export const SectionCargoLayout: React.FC<SectionCargoLayoutProps> = ({ deckLength }) => {
  return (
    <section>
      <h3 className={styles.title}>План размещения груза</h3>

      <div>
        <p>Перемещайте, удаляйте паллеты или изменяйте их габариты и вес.</p>
        <p>Используйте план для равномерного распределения груза и предотвращения перегрузки.</p>
      </div>

      <p>deckLength = {deckLength}</p>
    </section>
  );
};
