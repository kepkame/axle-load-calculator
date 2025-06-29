import { AboutSection } from '../AboutSection/AboutSection';
import styles from './DisclaimerSection.module.scss';

export const DisclaimerSection: React.FC = () => {
  return (
    <AboutSection>
      <div className={styles.disclaimer}>
        <h4 className={styles.title}>Внимание!</h4>
        <p>
          Расчёты в калькуляторе ориентировочные. Они не учитывают динамические нагрузки, точную
          геометрию шасси, состояние дорог и другие факторы.
        </p>
        <p>
          Для подтверждения используйте калиброванные весы и специализированные измерительные
          приборы.
        </p>
      </div>
    </AboutSection>
  );
};
