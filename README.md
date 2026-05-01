# Texture Generator

跨平台桌面纹理/阵列生成器，基于 Electron + Vite + React + TypeScript + Canvas 2D。

用户可以上传一张底图和多个元素素材，通过密度、尺寸、旋转、随机度与随机种子实时生成纹理排布，并导出为 PNG、JPEG、SVG。

## 功能特性

- 支持底图上传与多元素素材批量导入
- 支持密度、基础尺寸、尺寸随机度、基础角度、旋转随机度和完全随机旋转
- 支持可复现随机种子与一键重排
- 支持实时 Canvas 预览
- 支持导出 PNG、JPEG、SVG
- 支持 Electron 原生保存对话框
- 支持 macOS 与 Windows 安装包发布

## 技术栈

- Electron
- Vite
- React
- TypeScript
- Tailwind CSS
- Zustand
- electron-builder

## 本地开发

推荐 Node.js 20+。

```bash
npm install
npm run dev
```

## 打包

```bash
npm run dist:mac
npm run dist:win
```

默认打包产物输出到 `release/` 目录。

## 下载安装包

- 仓库目录：`release/`
- GitHub Releases：公开发布页会提供一键下载链接

发布成功后，可从仓库右侧的 Releases 页面直接下载：

- macOS：`.dmg`
- Windows：`.exe`

## GitHub 自动发布

项目内置 GitHub Actions 发布流程：

- 推送 `v*` 标签后自动构建 macOS / Windows 安装包
- 自动创建 GitHub Release
- 自动上传安装包到 Release Assets

示例：

```bash
git tag v0.1.0
git push origin v0.1.0
```

## 项目结构

```text
.
├── electron/              # Electron 主进程与 preload
├── src/                   # React 渲染层
├── release/               # 发布说明与安装包落位目录
├── electron-builder.yml   # 安装包配置
└── .github/workflows/     # 自动构建与发布
```

## 使用说明

1. 上传底图
2. 批量导入元素素材
3. 调整参数观察实时预览
4. 选择导出格式并保存

## License

MIT
