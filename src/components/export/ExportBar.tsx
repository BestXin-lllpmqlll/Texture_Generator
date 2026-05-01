import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportSvgString } from '@/renderer/svgExporter';
import { renderScene } from '@/renderer/canvasRenderer';
import type { ExportFormat, LoadedAsset, PlacedItem } from '@/renderer/types';
import { downloadDataUrl, downloadText } from '@/lib/file';

type ExportBarProps = {
  baseAsset: LoadedAsset | null;
  elements: LoadedAsset[];
  placements: PlacedItem[];
};

export function ExportBar({ baseAsset, elements, placements }: ExportBarProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [scale, setScale] = useState(2);
  const [status, setStatus] = useState('');
  const elementsById = useMemo(() => new Map(elements.map((item) => [item.id, item])), [elements]);

  const canExport = Boolean(baseAsset);

  const handleExport = async () => {
    if (!baseAsset) return;
    const filename = `texture-export.${format === 'jpeg' ? 'jpg' : format}`;

    try {
      if (format === 'svg') {
        const svg = exportSvgString({ baseAsset, elementsById, placements });
        if (window.electron?.saveFile) {
          const result = await window.electron.saveFile({
            defaultPath: filename,
            filters: [{ name: 'SVG', extensions: ['svg'] }],
            data: svg,
            encoding: 'utf8',
          });
          setStatus(result.canceled ? '已取消导出。' : `已保存：${result.filePath ?? filename}`);
        } else {
          downloadText(filename, svg, 'image/svg+xml;charset=utf-8');
          setStatus('已通过浏览器下载 SVG。');
        }
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(baseAsset.width * scale);
      canvas.height = Math.round(baseAsset.height * scale);
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Failed to create export canvas context.');

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.scale(scale, scale);
      renderScene({
        ctx: context,
        width: baseAsset.width,
        height: baseAsset.height,
        baseAsset,
        elementsById,
        placements,
        background: format === 'jpeg' ? '#ffffff' : undefined,
      });
      context.restore();

      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const dataUrl = canvas.toDataURL(mimeType, 0.92);
      if (window.electron?.saveFile) {
        const result = await window.electron.saveFile({
          defaultPath: filename,
          filters: [
            {
              name: format === 'jpeg' ? 'JPEG' : 'PNG',
              extensions: [format === 'jpeg' ? 'jpg' : 'png'],
            },
          ],
          data: dataUrl.split(',')[1] ?? '',
          encoding: 'base64',
        });
        setStatus(result.canceled ? '已取消导出。' : `已保存：${result.filePath ?? filename}`);
      } else {
        downloadDataUrl(filename, dataUrl);
        setStatus(`已通过浏览器下载 ${format.toUpperCase()}。`);
      }
    } catch (error) {
      console.error(error);
      setStatus('导出失败，请重试。');
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2 text-ui-sm">
          <span className="font-medium">格式</span>
          <select
            className="h-10 w-full rounded-xl border border-input bg-background px-3 text-ui-sm"
            value={format}
            onChange={(event) => setFormat(event.target.value as ExportFormat)}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="svg">SVG</option>
          </select>
        </label>
        <label className="space-y-2 text-ui-sm">
          <span className="font-medium">倍率</span>
          <select
            className="h-10 w-full rounded-xl border border-input bg-background px-3 text-ui-sm"
            value={scale}
            disabled={format === 'svg'}
            onChange={(event) => setScale(Number(event.target.value))}
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </label>
      </div>
      <Button className="w-full" onClick={handleExport} disabled={!canExport}>
        <Download className="h-4 w-4" />
        导出文件
      </Button>
      <p className="text-ui-xs text-muted-foreground">{status || '将使用系统保存对话框导出到本地文件。'}</p>
    </div>
  );
}
