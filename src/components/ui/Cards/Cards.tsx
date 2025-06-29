import clsx from 'clsx';
import { CardItem } from './CardItem';
import type { CardsProps } from './Cards.types';
import styles from './Cards.module.scss';

export const Cards: React.FC<CardsProps> = ({ data }) => {
  const isMultipleOfThree = data.length % 3 === 0;

  return (
    <ul className={clsx(styles.cards, { [styles.gridThreeCols]: isMultipleOfThree })}>
      {data.map((item, index) => (
        <CardItem key={index} title={item.title} description={item.description} />
      ))}
    </ul>
  );
};
