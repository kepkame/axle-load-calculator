import { AppDispatch } from '@store/index';
import { updateWheelbaseCachePartial } from '@store/slices/step1FormSlice/step1FormSlice';

interface SyncWheelbaseCacheParams {
  current: number[];
  defaultValues: number[];
  prevCache: number[];
  type: 'truck' | 'trailer';
  dispatch: AppDispatch;
}

/**
 * Conditionally updates the wheelbase cache in Redux if the current values
 * differ from the system defaults.
 * Skips dispatch when there's no meaningful user change.
 */
export function syncWheelbaseCache({
  current,
  defaultValues,
  prevCache,
  type,
  dispatch,
}: SyncWheelbaseCacheParams): void {
  const updated = [...prevCache];
  let hasChanges = false;

  current.forEach((value, index) => {
    const isUserChanged = value !== defaultValues[index];
    if (!isUserChanged) return;

    if (updated.length <= index) {
      updated.push(...Array(index - updated.length + 1).fill(0));
    }

    if (updated[index] !== value) {
      updated[index] = value;
      hasChanges = true;
    }
  });

  if (hasChanges) {
    dispatch(updateWheelbaseCachePartial({ type, values: updated }));
  }
}
