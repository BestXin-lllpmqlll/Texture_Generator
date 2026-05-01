import type { LoadedAsset } from '@/renderer/types';

export async function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

async function createBitmapFromDataUrl(dataUrl: string) {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Failed to create canvas context.');
  context.drawImage(image, 0, 0);
  return createImageBitmap(canvas);
}

export async function loadAssetFromFile(file: File): Promise<LoadedAsset> {
  const dataUrl = await readFileAsDataUrl(file);
  let bitmap: ImageBitmap;

  try {
    bitmap = await createImageBitmap(file);
  } catch {
    bitmap = await createBitmapFromDataUrl(dataUrl);
  }

  return {
    id: crypto.randomUUID(),
    name: file.name,
    dataUrl,
    bitmap,
    width: bitmap.width,
    height: bitmap.height,
    mimeType: file.type || 'image/png',
  };
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function dataUrlToBase64(dataUrl: string) {
  return dataUrl.split(',')[1] ?? '';
}

export function downloadText(filename: string, text: string, mimeType: string) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadDataUrl(filename: string, dataUrl: string) {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}
