# Release Assets

这个目录用于放置发布产物与下载说明。

## 约定

- 本地打包产物默认输出到当前目录
- GitHub Actions 也会把构建结果上传到 GitHub Releases
- 用户优先从 GitHub Releases 页面一键下载安装包
- 本地同步目录：`release/downloads/`

## 目标产物

- macOS: `.dmg`
- Windows: `.exe`

## 下载入口

发布完成后，请优先使用 GitHub Releases 页面中的安装包下载链接。

- Release 页面：
  `https://github.com/BestXin-lllpmqlll/Texture_Generator/releases/tag/v0.1.2`
- macOS 安装包：
  `https://github.com/BestXin-lllpmqlll/Texture_Generator/releases/download/v0.1.2/Texture-Generator-0.1.2-mac-arm64.dmg`
- Windows 安装包：
  `https://github.com/BestXin-lllpmqlll/Texture_Generator/releases/download/v0.1.2/Texture-Generator-0.1.2-win-x64.exe`

说明：

- Git 仓库本身不适合长期存放超大二进制安装包，因此公开下载以 GitHub Releases 为准
- 当前机器已将安装包同步到本地 `release/downloads/`
