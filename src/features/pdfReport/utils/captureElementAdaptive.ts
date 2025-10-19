import html2canvas from 'html2canvas';
import { waitForFontsReady } from '../helpers/waitForFontsReady';
import { trimTransparentBorders } from './trimTransparentBorders';

// Takes an offscreen snapshot of an HTML element with guaranteed correct geometry
export const captureElementAdaptive = async (
  el: HTMLElement,
  opts: {
    width?: number;
    height?: number;
    scale?: number;
    backgroundColor?: string | null;
  },
): Promise<HTMLCanvasElement> => {
  if (!el) throw new Error('No vehicle element found to take a snapshot');

  const { width, height, scale = 2, backgroundColor = null } = opts;
  const clone = el.cloneNode(true) as HTMLElement;

  clone.style.position = 'absolute';
  clone.style.left = '-999999px';
  clone.style.top = '0';
  clone.style.maxHeight = 'none';
  clone.style.height = 'auto';
  clone.style.boxSizing = 'border-box';
  clone.style.background = 'transparent';
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.overflow = 'visible';

  // Fix the virtual width (width of the A4 column in the PDF)
  // This ensures consistent rendering regardless of the browser window width.
  const rect = el.getBoundingClientRect();
  const targetWidth = Math.max(1, Math.round(width ?? (rect.width || 1024)));
  clone.style.width = `${targetWidth}px`;

  // Insert a temporary offscreen element into the DOM.
  document.body.appendChild(clone);
  await waitForFontsReady();

  const targetHeight = height ?? clone.scrollHeight ?? 1;

  const canvas = await html2canvas(clone, {
    scale,
    backgroundColor,
    width: targetWidth,
    height: targetHeight,
    useCORS: true,
  });

  // Remove the temporary DOM element after capturing
  document.body.removeChild(clone);

  return trimTransparentBorders(canvas);
};
