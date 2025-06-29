import type { CardItemProps } from './Cards.types';
import styles from './Cards.module.scss';

export const CardItem: React.FC<CardItemProps> = ({ title, description }) => {
  return (
    <li className={styles.cardItem}>
      {title && <h4>{title}</h4>}
      {description.map((row, index) => (
        <span key={index}>{row}</span>
      ))}
    </li>
  );
};
