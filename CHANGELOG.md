# Changelog

All notable changes to this project are documented in this file.

## v0.1.4

### Changed

- Updated the preview pipeline so parameter adjustments now refresh the canvas immediately instead of waiting for a debounce delay.
- Updated the development server config to allow automatic port fallback when `5173` is already occupied.
- Updated the Windows installer to use a guided NSIS flow instead of one-click installation, so users can choose a custom install location during setup.

### Improved

- Improved interaction feedback while dragging sliders or editing numeric values, making layout tuning feel more direct and responsive.

### Fixed

- Fixed the packaged Windows app startup failure caused by the Electron main-process bundle being emitted with ESM syntax and then loaded as CommonJS by Electron.

## v0.1.3

### Added

- Added `元素间距` control:
  positive values prevent overlap between elements, while negative values allow intentional stacking and overlap.
- Added `边缘间距` control:
  negative values allow elements to cross the canvas boundary until roughly half remains visible, `0` keeps elements exactly tangent to the edge, and positive values enforce a safety margin from the edge.
- Added true vector SVG export:
  when the base asset and all element assets are SVG files, the app now exports a real vector SVG by embedding parsed SVG content instead of raster `<image>` snapshots.

### Changed

- Expanded base image import to support `SVG` in addition to raster image formats.
- Updated the export panel so `SVG` becomes disabled when any imported asset is raster-based.
- Added clear availability messaging for vector export, including disabled-state hover hints and inline status copy.

### Fixed

- Kept export behavior consistent with asset capabilities:
  mixed SVG and bitmap asset sets now correctly fall back to raster-only export flows.
