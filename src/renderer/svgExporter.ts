import type { LoadedAsset, PlacedItem } from '@/renderer/types';

        type ExportSvgArgs = {
          baseAsset: LoadedAsset;
          elementsById: Map<string, LoadedAsset>;
          placements: PlacedItem[];
        };

        export function exportSvgString({ baseAsset, elementsById, placements }: ExportSvgArgs) {
          const elementNodes = placements
            .map((item) => {
              const element = elementsById.get(item.elementId);
              if (!element) return '';
              return `<g transform="translate(${item.x.toFixed(2)} ${item.y.toFixed(2)}) rotate(${item.rotation.toFixed(2)})"><image href="${element.dataUrl}" x="${(-item.width / 2).toFixed(2)}" y="${(-item.height / 2).toFixed(2)}" width="${item.width.toFixed(2)}" height="${item.height.toFixed(2)}" /></g>`;
            })
            .join('');

          return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${baseAsset.width}" height="${baseAsset.height}" viewBox="0 0 ${baseAsset.width} ${baseAsset.height}"><image href="${baseAsset.dataUrl}" width="${baseAsset.width}" height="${baseAsset.height}" />${elementNodes}</svg>`;
        }
