export type LoadedAsset = {
  id: string;
  name: string;
  dataUrl: string;
  bitmap: ImageBitmap;
  width: number;
  height: number;
  mimeType: string;
};

export type Params = {
  density: number;
  baseSize: number;
  sizeRandomness: number;
  baseAngle: number;
  rotationRandomness: number;
  rotationFullRandom: boolean;
  seed: number;
};

export type PlacedItem = {
  id: string;
  elementId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type ExportFormat = 'png' | 'jpeg' | 'svg';
