import clsx from 'clsx';
import IconPlus from '@assets/icons/plus.svg?react';
import styles from './ButtonAddGroup.module.scss';

interface ButtonAddGroupProps {
  onAddGroup: () => void;
  canAdd: boolean;
}

/**
 * Button component for adding a new cargo group.
 *
 * Renders an action button that appends a default cargo group item to the form array.
 * The button is disabled when adding new groups is restricted by platform length constraints.
 */
export const ButtonAddGroup: React.FC<ButtonAddGroupProps> = ({ onAddGroup, canAdd }) => {
  return (
    <button
      type="button"
      onClick={onAddGroup}
      className={clsx('btn btn--icon btn--outline', styles.btnAddGroup)}
      disabled={!canAdd}
    >
      <IconPlus className={clsx('icon', styles.icon)} />
      Добавить группу паллет
    </button>
  );
};
