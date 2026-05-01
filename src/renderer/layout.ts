import { clamp } from '@/lib/file';
import { mulberry32 } from '@/renderer/rng';
import type { LoadedAsset, Params, PlacedItem } from '@/renderer/types';

type GenerateLayoutArgs = {
  canvasWidth: number;
  canvasHeight: number;
  elements: LoadedAsset[];
  params: Params;
};

export function generateLayout({ canvasWidth, canvasHeight, elements, params }: GenerateLayoutArgs): PlacedItem[] {
  if (!canvasWidth || !canvasHeight || !elements.length || params.density <= 0) {
    return [];
  }

  const random = mulberry32(params.seed);
  const placements: PlacedItem[] = [];
  const total = clamp(Math.round(params.density), 1, 2000);

  for (let index = 0; index < total; index += 1) {
    const element = elements[Math.floor(random() * elements.length)];
    if (!element) continue;

    const sizeJitter = 1 + (random() * 2 - 1) * params.sizeRandomness;
    const scale = clamp(params.baseSize * sizeJitter, 0.05, 6);
    const width = element.width * scale;
    const height = element.height * scale;
    const x = random() * canvasWidth;
    const y = random() * canvasHeight;
    const rotation = params.rotationFullRandom
      ? random() * 360
      : params.baseAngle + (random() * 2 - 1) * params.rotationRandomness;

    placements.push({
      id: `${params.seed}-${index}`,
      elementId: element.id,
      x,
      y,
      width,
      height,
      rotation,
    });
  }

  return placements;
}
