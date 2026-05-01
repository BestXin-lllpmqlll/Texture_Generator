# Changelog

All notable changes to this project are documented in this file.

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
