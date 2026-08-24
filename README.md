# RLHF Book (简体中文)

《Reinforcement Learning from Human Feedback》的简体中文译本站点，基于 Next.js 构建，静态部署到 GitHub Pages。

## 在线地址

<https://gavin-richie.github.io/rlhf-book-zh-cn/>

## 功能

- 📚 完整章节内容（简体中文 / 繁体中文双语支持）
- 📐 KaTeX 数学公式渲染
- 🧪 交互式实验（Interactive Lab）支持
- 🌙 深色 / 浅色模式切换
- 🌐 国际化（zh-cn / zh-tw）

## 技术栈

- **Next.js 16** — App Router、React 19、TypeScript strict
- **Tailwind CSS v4** — oklch 设计令牌
- **KaTeX + marked** — Markdown 与数学公式渲染
- **GitHub Actions + GitHub Pages** — 静态部署

## 本地开发

```bash
npm install
npm run dev      # 启动开发服务器
npm run build    # 生产构建（输出到 out/）
npm run lint     # ESLint 检查
npm run typecheck # TypeScript 检查
npm run check    # lint + typecheck + build
```

## GitHub Pages 部署

本项目通过 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支（或手动触发 `Deploy to GitHub Pages` workflow）
2. Workflow 执行 `npm ci` → `npm run build`（`next.config.ts` 已配置 `output: "export"` 与 `basePath: /rlhf-book-zh-cn`）
3. 构建产物 `out/` 通过 `actions/deploy-pages` 发布

> 首次部署后需在 **Repo Settings → Pages → Source** 中选择 **GitHub Actions**。

## 项目结构

```
src/
  app/              # Next.js 路由（含 [locale] 国际化路由）
  components/       # React 组件
  i18n/             # 章节内容（zh-cn / zh-tw）
  lib/              # 工具函数
public/             # 静态资源
scripts/            # 本地一次性工具脚本
.github/workflows/  # GitHub Actions
```

## License

MIT
