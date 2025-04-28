import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@store/rootReducer';

interface StepGuardOptions {
  selector: (state: RootState) => boolean;
  fallbackPath: string;
}

/**
 * Custom hook for guarding access to step-specific routes.
 *
 * Redirects the user to the fallback path if the provided selector returns false,
 * ensuring that steps are only accessible when prerequisites are met.
 *
 * @param selector - Redux selector to determine if access is allowed
 * @param fallbackPath - Path to navigate to if access is denied
 */
export const useStepGuard = ({ selector, fallbackPath }: StepGuardOptions) => {
  const navigate = useNavigate();
  const isAllowed = useSelector(selector);

  useEffect(() => {
    if (!isAllowed) {
      // Redirects to fallback path if step access is not allowed
      navigate(fallbackPath, { replace: true });
    }
  }, [isAllowed, fallbackPath, navigate]);
};
