import { getUiErrorMessage } from '@utils/getUiErrorMessage';
import styles from './ErrorWithRetry.module.scss';

interface ErrorWithRetryProps {
  error: unknown;
  onRetry: () => void;
}

/**
 * UI block for displaying an error message with a retry button.
 *
 * Used on calculation/data fetch failures in stepper flows.
 * Accepts any error (RTK Query, network, etc.) and converts to readable text.
 */
export const ErrorWithRetry: React.FC<ErrorWithRetryProps> = ({ error, onRetry }) => {
  return (
    <div className={styles.error}>
      <p>Ошибка загрузки данных: {getUiErrorMessage(error)}</p>
      <button className="btn" onClick={onRetry}>
        Повторить
      </button>
    </div>
  );
};
