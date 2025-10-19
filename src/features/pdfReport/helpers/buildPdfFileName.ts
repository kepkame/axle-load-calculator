/**
 * Generates a stable name for the PDF report file.
 * Format: `axle_report_YYYY-MM-DD-HH-mm.pdf`
 */
export const buildPdfFileName = (d: Date = new Date()): string => {
  // Add a leading zero to numbers < 10 (e.g., 3 → "03")
  const pad = (n: number): string => String(n).padStart(2, '0');

  // Extract date and time components
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const HH = pad(d.getHours());
  const mm = pad(d.getMinutes());

  return `axle_report_${YYYY}-${MM}-${DD}-${HH}-${mm}.pdf`;
};
