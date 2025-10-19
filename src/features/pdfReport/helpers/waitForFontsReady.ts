/** Safe waiting for web fonts to load */
export const waitForFontsReady = async (): Promise<void> => {
  if (typeof document === 'undefined') return;

  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;

  if (!fonts) return;

  try {
    await fonts.ready;
  } catch {
    // ignore
  }
};
