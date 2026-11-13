import { RESUME_FILENAME, RESUME_PDF_PATH } from '../data/profile';

/**
 * Downloads the resume PDF via authenticated fetch, verifies the %PDF- signature
 * so an HTML fallback is never saved as a broken .pdf file, and triggers a Blob save.
 */
export async function downloadVerifiedResumePdf(): Promise<boolean> {
  const endpoints = ['/api/resume', RESUME_PDF_PATH];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
      });

      if (!response.ok) continue;

      const buffer = await response.arrayBuffer();
      const header = new Uint8Array(buffer.slice(0, 5));
      const signature = String.fromCharCode(...header);

      if (signature !== '%PDF-') {
        continue;
      }

      const blob = new Blob([buffer], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = RESUME_FILENAME;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 4000);

      return true;
    } catch {
      // Try next endpoint
    }
  }

  // Fallback to direct attachment endpoint
  window.location.assign('/api/resume');
  return false;
}
