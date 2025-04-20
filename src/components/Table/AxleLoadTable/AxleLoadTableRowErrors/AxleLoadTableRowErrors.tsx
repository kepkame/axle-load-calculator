import clsx from 'clsx';
import { AxleLoadTableRowErrorsProps } from './AxleLoadTableRowErrors.types';
import styles from './../AxleLoadTableRow/AxleLoadTableRow.module.scss';

export const AxleLoadTableRowErrors: React.FC<AxleLoadTableRowErrorsProps> = ({ errors }) => {
  const axleLoadEmptyError = errors?.axleLoadEmpty;
  const axleLoadLimitError = errors?.axleLoadLimit;

  if (!axleLoadEmptyError && !axleLoadLimitError) {
    return null;
  }

  return (
    <tr className={clsx(styles.row, styles.rowError)}>
      <td colSpan={3}>
        {axleLoadEmptyError?.message && (
          <p className="field-error">Ошибка в нагрузке без груза: {axleLoadEmptyError.message}</p>
        )}

        {axleLoadLimitError?.message && (
          <p className="field-error">Ошибка в макс. нагрузке: {axleLoadLimitError.message}</p>
        )}
      </td>
    </tr>
  );
};
