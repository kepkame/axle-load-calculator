import IconDrag from '@assets/icons/drag.svg?react';
import IconRemove from '@assets/icons/remove.svg?react';
import styles from './HeaderGroup.module.scss';

interface HeaderGroupProps {
  index: number;
  onClick: () => void;
}

/**
 * Visual component for a single cargo group header
 *
 * Provides drag-and-drop affordance
 * and a button to remove the group from the form.
 */
export const HeaderGroup: React.FC<HeaderGroupProps> = ({ index, onClick }) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        aria-label="Переместить группу паллет"
        className={styles.btnDragAndDrop}
      >
        <IconDrag className={styles.iconDrag} />
      </button>
      <h3 className={styles.groupName}>Группа {index + 1}</h3>

      <button
        type="button"
        aria-label="Удалить группу паллет"
        onClick={onClick}
        className={styles.btnRemoveGroup}
        title="Удалить группу паллет"
      >
        <IconRemove className={styles.iconRemove} />
      </button>
    </div>
  );
};
