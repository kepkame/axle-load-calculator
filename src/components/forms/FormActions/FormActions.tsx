import React from 'react';
import { IFormActionsProps } from './FormActions.types';
import styles from './FormActions.module.scss';

export const FormActions: React.FC<IFormActionsProps> = ({ onSave, showSave = false }) => {
  return (
    <div className={styles.formActions}>
      <button type="submit">Далее</button>

      {showSave && (
        <button type="button" onClick={onSave}>
          Сохранить параметры
        </button>
      )}
    </div>
  );
};
