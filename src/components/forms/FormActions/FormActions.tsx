import React from 'react';
import { IFormActionsProps } from './FormActions.types';
import styles from './FormActions.module.scss';

export const FormActions: React.FC<IFormActionsProps> = ({ onSave, showSave = false }) => {
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
