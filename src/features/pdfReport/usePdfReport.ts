import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { buildPdfFileName } from './helpers/buildPdfFileName';
import { buildPdfReport } from './buildPdfReport';
import type { BuildPdfArgs, PdfReportDocumentProps } from './types';

type SnapshotInput = Partial<BuildPdfArgs['snapshot']>;

interface UsePdfReportArgs {
  step1Data: PdfReportDocumentProps['step1Data'];
  rows: PdfReportDocumentProps['rows'];
  getCargoPlanElement: () => HTMLElement | null;
  snapshot?: SnapshotInput;
}

interface UsePdfReportResult {
  isBuilding: boolean;
  error: Error | null;
  buildAndDownload: () => Promise<void>;
  resetError: () => void;
}

const DEFAULT_SNAPSHOT: Required<SnapshotInput> = {
  width: 800,
  height: 0,
  scale: 2,
  backgroundColor: null,
};

/**
 * Hook for generating and downloading a PDF report.
 * Ensures safe state management on unmount and protection against concurrent executions.
 */
export const usePdfReport = ({
  step1Data,
  rows,
  getCargoPlanElement,
  snapshot,
}: UsePdfReportArgs): UsePdfReportResult => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Protection against parallel PDF generation runs
  const buildingRef = useRef(false);

  // Normalized snapshot — memoized by fields to avoid unnecessary re-creations
  const snap = useMemo<SnapshotInput>(() => {
    return {
      width: snapshot?.width ?? DEFAULT_SNAPSHOT.width,
      height: snapshot?.height,
      scale: snapshot?.scale ?? DEFAULT_SNAPSHOT.scale,
      backgroundColor: snapshot?.backgroundColor ?? DEFAULT_SNAPSHOT.backgroundColor,
    };
  }, [snapshot?.width, snapshot?.height, snapshot?.scale, snapshot?.backgroundColor]);

  // Utility: apply setState only if the hook is still in the DOM
  const setIfMounted = useCallback(
    <T>(setter: (v: T) => void) =>
      (value: T) => {
        if (!mountedRef.current) return;
        setter(value);
      },
    [],
  );

  const safeSetBuilding = setIfMounted(setIsBuilding);
  const safeSetError = setIfMounted(setError);
  const resetError = () => setError(null);

  const buildAndDownload = useCallback(async (): Promise<void> => {
    // Protection against multiple parallel executions
    if (buildingRef.current) return;

    buildingRef.current = true;
    safeSetBuilding(true);
    resetError();

    try {
      const el = getCargoPlanElement();
      if (!el) {
        throw new Error('No visualization DOM element found for snapshot');
      }

      const blob = await buildPdfReport({
        step1Data,
        rows,
        cargoPlanElement: el,
        snapshot: snap,
      });

      const filename = buildPdfFileName();
      try {
        saveAs(blob, filename);
      } catch (fsErr) {
        throw new Error(`Failed to save the file: ${(fsErr as Error).message}`);
      }
    } catch (e) {
      console.error('PDF generation error:', e);
      safeSetError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      buildingRef.current = false;
      safeSetBuilding(false);
    }
  }, [getCargoPlanElement, step1Data, rows, snap, resetError, safeSetBuilding, safeSetError]);

  return {
    isBuilding,
    error,
    buildAndDownload,
    resetError,
  };
};
