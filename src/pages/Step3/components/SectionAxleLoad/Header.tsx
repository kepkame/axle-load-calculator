import clsx from 'clsx';
import { Tooltip } from '@components/feedback/Tooltip/Tooltip';
import styles from './Header.module.scss';

/** Renders the title and a color legend (in a tooltip) */
export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>Нагрузка на оси</h3>

      <Tooltip>
        <>
          <p className={styles.tooltipParagraph}>Значения цветов в нагрузке осей:</p>
          <ul className={styles.tooltipList}>
            <li>
              <span
                className={clsx(styles.tooltipListColor, styles.tooltipListColorSuccess)}
              ></span>
              <span>- менее 85%</span>
            </li>
            <li>
              <span
                className={clsx(styles.tooltipListColor, styles.tooltipListColorWarning)}
              ></span>
              <span>- в пределах 85–99%</span>
            </li>
            <li>
              <span className={clsx(styles.tooltipListColor, styles.tooltipListColorDanger)}></span>
              <span>- перегруз</span>
            </li>
          </ul>
        </>
      </Tooltip>
    </div>
  );
};
