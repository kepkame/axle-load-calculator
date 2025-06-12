import { canBeLifted } from './canBeLifted';
import { prepareAxleFields } from './prepareAxleFields';
import type { AxleLoadDataItem } from '@entities/step1Form/types';

interface Params {
  truckAxles: number;
  trailerAxles: number;
  axleCache: Record<string, AxleLoadDataItem>;
  prevAxleCount: number;
}

/**
 * Prepares a new "axleLoadData" array, using cached values if available and valid.
 *
 * This is called when axle counts change to determine whether the form array
 * needs to be regenerated, and if so - it rebuilds it using both defaults and
 * selectively restored values (lifted, empty/load limits) from cache.
 */
export function applyAxleArraySync({
  truckAxles,
  trailerAxles,
  axleCache,
  prevAxleCount,
}: Params): { shouldReplace: boolean; newArray?: AxleLoadDataItem[]; newAxleCount: number } {
  const currentTotal = Math.max(0, truckAxles) + Math.max(0, trailerAxles);

  // Skip rebuild if the form is already filled or axle count hasn't changed
  if (prevAxleCount === currentTotal) {
    return { shouldReplace: false, newAxleCount: currentTotal };
  }

  const fresh = prepareAxleFields(truckAxles, trailerAxles);

  let truckAxleIndex = 0;
  let trailerAxleIndex = 0;

  for (let i = 0; i < fresh.length; i++) {
    const item = fresh[i];
    const cached = axleCache[item.axleId];

    if (cached?.axleType === item.axleType && cached.axleId === item.axleId) {
      item.axleLoadEmpty = cached.axleLoadEmpty;
      item.axleLoadLimit = cached.axleLoadLimit;

      // Validate "lifted" flag — only reapply if still allowed for current config
      const relIdx = item.axleType === 'truck' ? truckAxleIndex : trailerAxleIndex;
      const total = item.axleType === 'truck' ? truckAxles : trailerAxles;
      const allowed = canBeLifted(item.axleType, relIdx, total);

      item.lifted = allowed ? cached?.lifted ?? false : false;

      if (item.axleType === 'truck') truckAxleIndex++;
      else trailerAxleIndex++;
    }
  }

  return {
    shouldReplace: true,
    newArray: fresh,
    newAxleCount: currentTotal,
  };
}
