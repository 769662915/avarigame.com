# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个游戏门户网站项目，使用 Next.js 14 + TypeScript 构建，支持多语言（英语和日语），采用静态导出方式部署。

## 技术栈

- **框架**: Next.js 14.2.30 (App Router)
- **语言**: TypeScript
- **UI 框架**: Chakra UI
- **国际化**: next-intl
- **动画**: Framer Motion
- **其他**: dayjs, lodash, react-icons

## 开发命令

```bash
# 开发服务器（默认端口 3000）
npm run dev

# 构建静态站点
npm run build

# 启动生产服务器（端口 3336）
npm start

# 代码检查
npm run lint
```

## 项目架构

### 路由结构

项目使用 Next.js App Router 和 next-intl 实现国际化路由：

- `src/app/[locale]/page.tsx` - 首页（游戏列表）
- `src/app/[locale]/play/[id]/page.tsx` - 游戏播放页面
- `src/app/[locale]/category/[slug]/page.tsx` - 分类页面
- `src/app/[locale]/detail/[slug]/page.tsx` - 游戏详情页面

### 数据管理

**重要**: 项目使用静态 JSON 文件作为数据源，不使用数据库。

数据文件位置：
- `data/[locale]/data.json` - 游戏数据
- `data/[locale]/categories.json` - 分类数据

数据按语言分离存储（`en-US`, `ja-JP`），通过 `src/actions.ts` 中的服务函数动态导入：
- `getGames(locale)` - 获取所有游戏
- `getCategories(locale)` - 获取所有分类
- `getCategory(locale, slug)` - 获取特定分类及其游戏
- `getGame(locale, slug)` - 获取特定游戏

数据类型定义在 `src/services/data.d.ts`：
- `GameRecord` - 游戏记录（包含 name, image, gameUrl, description, categoryId, slug, instructions, id, likes）
- `CategoryRecord` - 分类记录（包含 id, name, alias）

### 国际化

支持的语言：
- `en-US` (默认)
- `ja-JP`

配置文件：
- `src/i18n/routing.ts` - 路由配置和导航工具
- `messages/[locale].json` - UI 文本翻译

使用 `next-intl` 的导航工具（Link, redirect, usePathname, useRouter）而非 Next.js 原生工具。

### 主题系统

项目实现了基于分类的动态主题系统（`src/configs.ts`）：

- `CATEGORY_THEME_MAP` - 为不同分类定义独特的颜色主题（action, adventure, boys, shooting, stickman）
- `getCategoryTheme(alias)` - 根据分类别名获取主题配置
- 每个主题包含：accent, accentSoft, surface, border, glow, text, muted, hero

### 静态导出配置

项目配置为静态站点导出（`next.config.mjs`）：
- `output: "export"` - 生成静态 HTML
- `images.unoptimized: true` - 禁用图片优化
- 构建后生成 `out/` 目录

### TypeScript 配置

路径别名：`@/*` 映射到 `./src/*`

示例：
```typescript
import { GameRecord } from '@/services/data';
import { getGames } from '@/actions';
```

### AdSense 集成

AdSense 配置在 `src/configs.ts`：
- `ADSENSE_CLIENT` - 客户端 ID
- `ADSENSE_SLOTS` - 广告位配置（homeBanner, detailRecommend）

## 添加新功能

### 添加新语言

1. 在 `src/i18n/routing.ts` 的 `locales` 数组中添加新语言代码
2. 创建 `data/[new-locale]/data.json` 和 `categories.json`
3. 创建 `messages/[new-locale].json`
4. 在 `src/configs.ts` 的 `LOCALE_OPTIONS` 中添加语言选项

### 添加新分类主题

在 `src/configs.ts` 的 `CATEGORY_THEME_MAP` 中添加新的分类主题配置。

### 修改游戏数据

直接编辑 `data/[locale]/data.json` 文件，无需重启开发服务器（热重载支持）。
