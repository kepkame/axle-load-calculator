import { Buffer } from 'buffer';
import { registerPdfFonts } from '../config/registerFonts';

let initialized = false;

/** Ensures that the environment for PDF rendering is properly prepared. */
export const ensureEnvironment = (): void => {
  if (initialized) return;

  const g = globalThis as unknown as { Buffer?: typeof Buffer };
  if (!g.Buffer) g.Buffer = Buffer;

  registerPdfFonts();

  // Mark that the environment is ready
  initialized = true;
};
