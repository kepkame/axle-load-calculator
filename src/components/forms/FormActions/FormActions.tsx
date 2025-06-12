import { FormActionsProps } from './FormActions.types';
import styles from './FormActions.module.scss';

/**
 * Renders action buttons for the form footer.
 */
export const FormActions: React.FC<FormActionsProps> = ({ onSave, showSave = false }) => {
  return (
    <div className={styles.formActions}>
      <button className="btn" type="submit">
        Далее
      </button>

      {showSave && (
        <button className="btn btn--outline" type="button" onClick={onSave}>
          Сохранить параметры
        </button>
      )}
    </div>
  );
};
