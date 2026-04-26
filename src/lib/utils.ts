import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { saveAs } from 'file-saver';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadFile(data: Uint8Array | string, fileName: string, mimeType?: string) {
  if (data instanceof Uint8Array) {
    const blob = new Blob([data], { type: mimeType || 'application/pdf' });
    saveAs(blob, fileName);
  } else {
    // If it's a URL (string), saveAs also handles it
    saveAs(data, fileName);
  }
}
