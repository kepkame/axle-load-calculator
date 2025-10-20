import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to top smoothly on every route change.
 * - Uses native smooth scroll when allowed by system.
 * - Falls back to JS animation if "Reduce Motion" is enabled.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If the system setting allows animations — use native smooth scrolling
    if (!prefersReducedMotion) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    // Otherwise, perform a forced JS animation
    const duration = 300;
    const start = window.scrollY;
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      window.scrollTo(0, start * (1 - eased));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [pathname]);

  return null;
};
