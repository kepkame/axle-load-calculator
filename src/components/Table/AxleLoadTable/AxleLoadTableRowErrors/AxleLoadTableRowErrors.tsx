import clsx from 'clsx';
import { AxleLoadTableRowErrorsProps } from './AxleLoadTableRowErrors.types';
import styles from './../AxleLoadTableRow/AxleLoadTableRow.module.scss';

/**
 * Displays validation errors below a single axle load row.
 *
 * Renders a full-width row only when there is an error in either
 * the empty load or max load input for the current axle.
 */
export const AxleLoadTableRowErrors: React.FC<AxleLoadTableRowErrorsProps> = ({ errors }) => {
  const axleLoadEmptyError = errors?.axleLoadEmpty;
  const axleLoadLimitError = errors?.axleLoadLimit;

  // Avoid rendering an empty error row
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
