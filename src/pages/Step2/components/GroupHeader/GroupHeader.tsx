import type { DragControls } from 'motion/react';
import IconDrag from '@assets/icons/drag.svg?react';
import IconRemove from '@assets/icons/remove.svg?react';
import styles from './GroupHeader.module.scss';

interface GroupHeaderProps {
  groupId: number;
  onClick: () => void;
  dragControls: DragControls;
}

/**
 * Visual component for a single cargo group header
 *
 * Provides drag-and-drop affordance
 * and a button to remove the group from the form.
 */
export const GroupHeader: React.FC<GroupHeaderProps> = ({ groupId, onClick, dragControls }) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        aria-label="Переместить группу паллет"
        className={styles.btnDragAndDrop}
        onPointerDown={(e) => dragControls.start(e)}
        style={{ touchAction: 'none' }}
      >
        <IconDrag className={styles.iconDrag} />
      </button>
      <h3 className={styles.groupName}>Группа {groupId}</h3>

      <button
        type="button"
        onClick={onClick}
        className={styles.btnRemoveGroup}
        title="Удалить группу паллет"
      >
        <IconRemove className={styles.iconRemove} />
      </button>
    </div>
  );
};
