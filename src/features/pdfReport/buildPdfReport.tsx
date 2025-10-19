import { pdf } from '@react-pdf/renderer';

import { formatDateTime } from '@utils/formatDateTime';
import { ensureEnvironment } from './helpers/ensureEnvironment';
import { waitForFontsReady } from './helpers/waitForFontsReady';
import { captureElementAdaptive } from './utils/captureElementAdaptive';
import { computeRightPanelImageHeightPt } from './utils/computeRightPanelImageHeightPt';

import { PdfReportDocument } from './PdfReportDocument';
import type { BuildPdfArgs } from './types';

/** Wraps an async operation and rethrows errors with a unified message. */
async function safeAsync<T>(promise: Promise<T>, message: string): Promise<T> {
  try {
    return await promise;
  } catch (e) {
    throw new Error(`${message}: ${(e as Error).message}`);
  }
}

/**
 * Main function for generating a PDF report on axle load.
 * Returns a Blob ready for the user to download.
 */
export const buildPdfReport = async (params: BuildPdfArgs): Promise<Blob> => {
  ensureEnvironment();
  await waitForFontsReady();

  const { step1Data, rows, cargoPlanElement, snapshot } = params;

  // Capturing an HTML snapshot of the visualization (DOM → Canvas)
  const snapshotCanvas = await safeAsync(
    captureElementAdaptive(cargoPlanElement, snapshot),
    'Failed to capture cargo plan',
  );

  const cargoPlanPngDataUrl = snapshotCanvas.toDataURL('image/png');
  const imageHeightPt = computeRightPanelImageHeightPt(snapshotCanvas);
  const dateText = formatDateTime(new Date());

  if (!cargoPlanPngDataUrl || typeof cargoPlanPngDataUrl !== 'string') {
    throw new Error('Failed to encode cargo plan image');
  }

  const pdfInstance = pdf(
    <PdfReportDocument
      dateText={dateText}
      step1Data={step1Data}
      rows={rows}
      cargoPlanPngDataUrl={cargoPlanPngDataUrl}
      imageHeightPt={imageHeightPt}
    />,
  );

  return safeAsync(pdfInstance.toBlob(), 'Failed to render PDF');
};
