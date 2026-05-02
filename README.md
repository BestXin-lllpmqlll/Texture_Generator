# Texture Generator

<div align="center">

一个面向设计场景的桌面纹理 / 阵列生成工具。  
A desktop texture / array generator built for design production workflows.

[![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Release](https://img.shields.io/badge/Releases-GitHub-black?logo=github)](https://github.com/BestXin-lllpmqlll/Texture_Generator/releases)

</div>

---

## 中文

### 项目简介

`Texture Generator` 是一个基于 `Electron + Vite + React + TypeScript + Canvas` 的跨平台桌面应用，用来快速生成纹理、贴图阵列和素材铺排结果。

你可以上传一张底图作为画布，再批量导入多个元素素材，通过密度、尺寸、元素间距、边缘间距、旋转和随机种子等参数实时生成排布预览，并导出为 `PNG`、`JPEG`、`SVG` 文件。

这个项目适合：

- 贴图设计与花型探索
- 背景图案批量生成
- 电商、包装、视觉稿中的素材阵列排版
- 需要可复现随机结果的设计工作流

### 核心亮点

- 实时预览：参数变更后以防抖方式刷新画布，兼顾流畅度与性能
- 拖拽导入：支持拖拽或点击上传底图与多个元素素材
- 随机可复现：支持随机种子控制和一键重排，方便复用同一排布逻辑
- 精细排布：支持元素间距与边缘间距控制，可快速得到更规整或更自由的铺排效果
- 智能导出：支持 `PNG`、`JPEG`、`SVG` 三种格式，并按素材类型自动切换可用导出能力
- 桌面原生体验：通过 Electron 调用系统保存对话框，导出路径更符合桌面软件习惯
- 可发布安装包：已配置 `electron-builder` 与 GitHub Actions，支持 macOS / Windows 分发

### 功能特性

- 底图上传：支持 `PNG`、`JPEG`、`WEBP`、`SVG`
- 元素上传：支持 `PNG`、`JPEG`、`WEBP`、`SVG`，可多选批量导入
- 参数控制：
  - 密度
  - 基础尺寸
  - 元素间距
  - 边缘间距
  - 尺寸随机度
  - 基础角度
  - 旋转随机度
  - 完全随机旋转
  - 随机种子
- 实时统计：
  - 底图尺寸
  - 元素数量
  - 排布实例数量
- 导出能力：
  - `PNG`
  - `JPEG`
  - `SVG` 真矢量导出，仅当底图和全部元素素材都是 `SVG` 时可用

### 最新更新

- 参数实时刷新：
  调整滑块或输入数值时，画布会立即更新，不再等待防抖延迟。
- 开发环境更宽松：
  当 `5173` 端口已被占用时，Vite 开发服务允许自动切换到其他可用端口。
- 新增 `元素间距` 滑块：
  正值会阻止元素彼此重叠，负值则允许元素有意压叠。
- 新增 `边缘间距` 滑块：
  负值允许元素越过画布边缘并最多保留约一半可见，`0` 时刚好贴边，正值时会与边缘保持安全距离。
- 升级 `SVG` 导出逻辑：
  当底图和所有元素都是 `SVG` 时，可导出真正的矢量结构；只要混入任意位图素材，`SVG` 按钮就会自动置灰并给出提示。

### 为什么这个工具实用

- 比手工复制旋转缩放更快：适合快速试出多个方向
- 比纯脚本更直观：设计师可直接在 UI 中调参数
- 比一次性随机更稳定：随机种子让结果可回放、可复用、可沟通

### 技术栈

- Electron
- Vite
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- Canvas 2D
- electron-builder
- GitHub Actions

### 快速开始

推荐环境：

- Node.js `20+`
- npm `10+`

安装依赖并启动开发环境：

```bash
npm install
npm run dev
```

### 打包

构建当前平台安装包：

```bash
npm run dist
```

分别构建 macOS / Windows：

```bash
npm run dist:mac
npm run dist:win
```

默认产物输出到 `release/` 目录。

### 使用流程

1. 上传底图
2. 拖入或批量选择元素素材
3. 调整密度、尺寸、旋转与随机参数
4. 观察实时预览效果
5. 选择导出格式并保存到本地

### GitHub 发布

仓库已包含 GitHub Actions 发布流程：

- 推送 `v*` 标签后自动触发构建
- 自动生成 GitHub Release
- 自动上传 macOS / Windows 安装包到 Release Assets

示例：

```bash
git tag v0.1.2
git push origin v0.1.2
```

发布页：

- [GitHub Releases](https://github.com/BestXin-lllpmqlll/Texture_Generator/releases)
- [Changelog](./CHANGELOG.md)

### 项目结构

```text
.
├── electron/              # Electron 主进程与 preload
├── src/
│   ├── components/        # 业务组件与 UI 组件
│   ├── hooks/             # 复用逻辑
│   ├── renderer/          # 排布计算、Canvas 渲染、SVG 导出
│   ├── store/             # Zustand 状态管理
│   └── App.tsx            # 主界面
├── .github/workflows/     # CI / Release 流程
├── electron-builder.yml   # 打包配置
└── package.json
```

### 常见问题

#### 1. 为什么推荐桌面端而不是浏览器版？

桌面端可以直接调用系统文件保存对话框，导出体验更稳定，也更适合处理本地素材文件。

#### 2. SVG 导出是纯矢量吗？

当底图和所有元素素材都是 `SVG` 时，导出结果是纯矢量结构；如果任意素材是位图，界面会自动禁用 `SVG` 导出，仅保留位图格式。

#### 3. 如果本地安装依赖失败怎么办？

如果你在本地遇到 SSL 证书相关错误，例如 `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`，通常与 Node / npm / 系统证书环境有关。建议优先检查：

- Node 与 npm 版本
- 企业网络或代理设置
- 系统根证书是否完整

### Roadmap

- 更多排布算法
- 图层混合与透明度控制
- 参数预设保存 / 加载
- 更完整的发布产物与版本管理

### License

MIT

---

## English

### Overview

`Texture Generator` is a cross-platform desktop app built with `Electron + Vite + React + TypeScript + Canvas` for generating texture layouts, repeated patterns, and randomized element arrangements.

You can upload one base image as the canvas, import multiple element assets in batch, tweak parameters such as density, size, element spacing, edge margin, rotation, and random seed, and export the result as `PNG`, `JPEG`, or `SVG`.

This project is a good fit for:

- texture and pattern exploration
- background asset generation
- repeated element composition for visual design
- reproducible random layouts in production workflows

### Highlights

- Real-time preview with debounced rendering for smoother interactions
- Drag-and-drop asset import for both the base image and element images
- Reproducible randomness with seed control and reshuffle support
- Fine layout control with element spacing and edge margin sliders
- Smart export capability that enables true vector SVG only when all imported assets are SVG
- Native desktop save flow powered by Electron system dialogs
- Release-ready packaging pipeline for macOS and Windows

### Features

- Base image input: `PNG`, `JPEG`, `WEBP`, `SVG`
- Element input: `PNG`, `JPEG`, `WEBP`, `SVG`
- Batch import for multiple element assets
- Parameter controls:
  - density
  - base size
  - element spacing
  - edge margin
  - size randomness
  - base angle
  - rotation randomness
  - fully random rotation
  - random seed
- Live stats:
  - base image size
  - number of elements
  - number of generated placements
- Export formats:
  - `PNG`
  - `JPEG`
  - true vector `SVG` export when every imported asset is SVG

### Latest Updates

- Real-time parameter preview:
  the canvas now refreshes immediately while sliders and numeric values are being adjusted.
- More flexible dev server startup:
  when port `5173` is occupied, Vite can now fall back to another available port automatically.
- Added an `element spacing` slider:
  positive values prevent overlap, while negative values allow intentional overlap.
- Added an `edge margin` slider:
  negative values let elements cross the border until about half remains visible, `0` keeps them tangent to the edge, and positive values keep them away from the canvas boundary.
- Upgraded SVG export:
  when the base asset and all elements are SVG, the app exports a true vector SVG; if any raster asset is present, the `SVG` option is disabled with a clear hint.

### Why It Is Useful

- Faster than manually duplicating, rotating, and scaling assets
- More visual than a script-only workflow
- More controllable than one-off randomness thanks to reproducible seeds

### Tech Stack

- Electron
- Vite
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- Canvas 2D
- electron-builder
- GitHub Actions

### Quick Start

Recommended environment:

- Node.js `20+`
- npm `10+`

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

### Build

Build for the current platform:

```bash
npm run dist
```

Build macOS and Windows packages separately:

```bash
npm run dist:mac
npm run dist:win
```

Artifacts are generated in the `release/` directory by default.

### Workflow

1. Upload a base image
2. Drag in or batch select element assets
3. Adjust density, size, rotation, and randomness
4. Review the real-time preview
5. Export the final result in your preferred format

### GitHub Release

The repository already includes a GitHub Actions release workflow:

- pushing a `v*` tag triggers the build
- GitHub Release can be created automatically
- macOS and Windows installers are uploaded as release assets

Example:

```bash
git tag v0.1.3
git push origin v0.1.3
```

Releases:

- [GitHub Releases](https://github.com/BestXin-lllpmqlll/Texture_Generator/releases)

### Project Structure

```text
.
├── electron/              # Electron main process and preload
├── src/
│   ├── components/        # UI and feature components
│   ├── hooks/             # shared hooks
│   ├── renderer/          # layout generation, canvas rendering, SVG export
│   ├── store/             # Zustand state stores
│   └── App.tsx            # main application shell
├── .github/workflows/     # CI / release workflow
├── electron-builder.yml   # packaging config
└── package.json
```

### FAQ

#### 1. Why use a desktop app instead of a browser-only app?

A desktop app provides a more reliable local file workflow and integrates nicely with native save dialogs.

#### 2. Is SVG export fully vector-based?

Yes, but only when the base asset and all element assets are SVG files. If any raster asset is included, the SVG option is disabled and only raster exports remain available.

#### 3. What if dependency installation fails locally?

If you run into SSL certificate related issues such as `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, check your Node/npm versions, proxy settings, and local certificate environment first.

### Roadmap

- more layout algorithms
- layer blending and opacity controls
- preset save / load support
- more complete release assets and versioning workflow

### License

MIT
