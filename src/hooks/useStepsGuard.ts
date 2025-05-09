import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectStep1FormFilled } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { selectStep2FormFilled } from '@store/slices/step2FormSlice/step2FormSlice.selectors';

interface StepsGuardOptions {
  requireStep1?: boolean;
  requireStep2?: boolean;
}

/**
 * Redirects to the appropriate step if required steps are incomplete.
 *
 * @param requireStep1 – Redirects to '/' if step 1 is not filled
 * @param requireStep2 – Redirects to '/step2' if step 2 is not filled
 * @returns true if all required steps are filled
 */
export function useStepsGuard({
  requireStep1 = false,
  requireStep2 = false,
}: StepsGuardOptions): boolean {
  const navigate = useNavigate();
  const isStep1Filled = useSelector(selectStep1FormFilled);
  const isStep2Filled = useSelector(selectStep2FormFilled);

  // Calculate if access is allowed
  const isAllowed = (!requireStep1 || isStep1Filled) && (!requireStep2 || isStep2Filled);

  useEffect(() => {
    if (requireStep1 && !isStep1Filled) {
      navigate('/', { replace: true });
    } else if (requireStep2 && !isStep2Filled) {
      navigate('/step2', { replace: true });
    }
  }, [requireStep1, requireStep2, isStep1Filled, isStep2Filled, navigate]);

  return isAllowed;
}
