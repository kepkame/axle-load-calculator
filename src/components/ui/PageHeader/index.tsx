import { PageHeaderProps } from './index.type';
import styles from './index.module.scss';

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  id,
  tooltip,
  renderDescription,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <h1 id={id} className={styles.title}>
          {title}
        </h1>
        {tooltip && <div>{tooltip}</div>}
      </div>

      {renderDescription && renderDescription() && (
        <div className={styles.description}>{renderDescription()}</div>
      )}
    </div>
  );
};
