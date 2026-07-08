# removepdfpages.net Ahrefs Crawl Issue 修复报告

## 任务
修复 Ahrefs 报告的以下 crawl issue：
1. 「元描述过长」
2. 「Noindex 页面」

---

## 一、全站 Meta Description 审计

| 页面 | 修改前长度 | 修改后长度 | 状态 | 说明 |
|------|------------|------------|------|------|
| `/` (首页) | 162 字符 | 147 字符 | ✅ 已修复 | 重写 description，去掉冗余词 |
| `/remove-pdf-pages/` | 167 字符 | 155 字符 | ✅ 已修复 | 重写 description，简化表达 |
| `/split-pdf/` | 121 字符 | 121 字符 | ✅ 无变化 | 已符合要求 |
| `/merge-pdf/` | 143 字符 | 143 字符 | ✅ 无变化 | 已符合要求 |
| `/extract-pdf-pages/` | 136 字符 | 136 字符 | ✅ 无变化 | 已符合要求 |
| `/compress-pdf/` | 151 字符 | 151 字符 | ✅ 无变化 | 已符合要求 |
| `/pricing/` | 144 字符 | 144 字符 | ✅ 无变化 | 已符合要求 |
| `/blog/best-free-pdf-page-removers/` | 134 字符 | 134 字符 | ✅ 无变化 | 已符合要求 |
| `/privacy/` | 140 字符 | 140 字符 | ✅ 无变化 | 已符合要求 |
| `/terms/` | 141 字符 | 141 字符 | ✅ 无变化 | 已符合要求 |
| `/contact/` | 145 字符 | 145 字符 | ✅ 无变化 | 已符合要求 |
| `/checkout/success/` | 71 字符 | 71 字符 | ✅ 无变化 | 已符合要求 |
| `/checkout/cancel/` | 50 字符 | 50 字符 | ✅ 无变化 | 已符合要求 |
| `/workspace/` | 131 字符 | 131 字符 | ✅ 无变化 | 已符合要求 |
| 根布局 fallback | 146 字符 | 146 字符 | ✅ 无变化 | 已符合要求 |

**结论**：所有页面 meta description 均已 ≤160 字符。

---

## 二、模板层防御性截断

为防后续新增/修改页面再次超限，在 `lib/seo.ts` 中新增 `truncateDescription()`：

- 超过 160 字符时按最后一个完整空格截断，并追加 `...`
- `buildMetadata()` 内部自动应用该截断
- 根布局 `app/layout.tsx` 的 fallback description 也接入该截断

代码示例：
```ts
export const MAX_META_DESCRIPTION_LENGTH = 160;

export function truncateDescription(text: string, maxChars = MAX_META_DESCRIPTION_LENGTH): string {
  if (text.length <= maxChars) return text;
  const truncated = text.slice(0, maxChars);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace <= 0) return truncated.trimEnd() + "...";
  return truncated.slice(0, lastSpace).trimEnd() + "...";
}
```

---

## 三、Noindex 页面清单

| 页面 | 当前状态 | 业务建议 | 是否保留 noindex | Sitemap 是否已排除 |
|------|----------|----------|------------------|-------------------|
| `/workspace/` | `noindex, follow` | 工具工作区，空状态无内容，不建议被索引 | ✅ 保留 | ✅ 已排除 |
| `/checkout/success/` | `noindex, follow` | 会话状态页，无通用 SEO 价值 | ✅ 保留 | ✅ 已排除 |
| `/checkout/cancel/` | `noindex, follow` | 会话状态页，无通用 SEO 价值 | ✅ 保留 | ✅ 已排除 |
| 404 / `_not-found` | 自动生成 `noindex` | Next.js 默认行为 | ✅ 保留 | 未在 sitemap |

> **更新说明**：已根据后端协调结果，将 `/checkout/success/` 和 `/checkout/cancel/` 也标记为 `noindex` 并从 sitemap 排除。

**结论**：`/workspace/`、`/checkout/success/`、`/checkout/cancel/` 均为业务上必须保留的 noindex 页面，且均已从 sitemap 中排除。

---

## 四、Sitemap 与 Robots 检查

- `app/sitemap.ts` 使用 `INDEXABLE_ROUTES` 生成，已过滤 `noindex: true` 的路由。
- `lib/routes.ts` 中 `/workspace/`、`/checkout/success/`、`/checkout/cancel/` 均明确标记 `noindex: true`，并在注释中说明需与页面 metadata 保持同步。
- `app/robots.ts` 允许所有爬虫，未阻止任何页面；noindex 通过页面级 metadata 控制。
- 生成后的 `out/sitemap.xml` 实测不含 `https://removepdfpages.net/workspace/`、`/checkout/success/`、`/checkout/cancel/`。

---

## 五、修改文件 Diff

```diff
# lib/seo.ts
+ export const MAX_META_DESCRIPTION_LENGTH = 160;
+ export function truncateDescription(text: string, maxChars = MAX_META_DESCRIPTION_LENGTH): string { ... }
  export function buildMetadata(config: PageSeoConfig): Metadata {
+   const description = truncateDescription(config.description);
    return {
      ...
-     description: config.description,
+     description,
      ...
    };
  }

# app/layout.tsx
+ import { truncateDescription } from "@/lib/seo";
  export const metadata: Metadata = {
    ...
-   description: "Delete unwanted pages from any PDF online...",
+   description: truncateDescription("Delete unwanted pages from any PDF online..."),
    ...
  }

# app/page.tsx
- "Free online PDF tools: remove pages, split, merge, extract pages, and compress PDFs. All processing happens in your browser — fast, private, and no signup needed."
+ "Free online PDF tools: remove, split, merge, extract, and compress PDFs. All processing runs in your browser — fast, private, and no signup needed."

# app/remove-pdf-pages/page.tsx
- "Remove pages from any PDF in seconds. No signup, no upload to a server, and no watermarks. Free for files up to 20 MB and 200 pages. Works on Mac, Windows, and mobile."
+ "Remove pages from any PDF in seconds. No signup, no upload, and no watermarks. Free for files up to 20 MB and 200 pages. Works on Mac, Windows, and mobile."

# app/checkout/success/page.tsx
+ noindex: true,

# app/checkout/cancel/page.tsx
+ noindex: true,

# lib/routes.ts
+ { path: "/checkout/success/", noindex: true, changefreq: "yearly", priority: 0.3 },
+ { path: "/checkout/cancel/", noindex: true, changefreq: "yearly", priority: 0.3 },
```

---

## 六、验证结果

- `npx tsc --noEmit` ✅ 通过
- `npm run build` ✅ 成功，19 个静态路由全部预渲染
- 生成后的 `out/` 目录中所有 `.html` 文件的 `<meta name="description">` 长度均 ≤160 字符
- `out/sitemap.xml` 不包含 `/workspace/`、`/checkout/success/`、`/checkout/cancel/`
- `/workspace/index.html` 正确输出 `<meta name="robots" content="noindex, follow">`
- `/checkout/success/index.html` 正确输出 `<meta name="robots" content="noindex, follow">`
- `/checkout/cancel/index.html` 正确输出 `<meta name="robots" content="noindex, follow">`

---

## 七、备注

- `site-copywriting-student` skill 当前在 skill 仓库中不可用，因此文案重写由前端直接完成。
- 工作区中仍有其他未提交修改（`components/home/home-faq-section.tsx`、`components/remove-pdf-pages/landing-faq.tsx`、`components/site-shell.tsx`、`components/workspace/workspace-client.tsx`、`components/workspace/workspace-page-picker.tsx`、`PROMPT_SYSTEM.md`），这些与本次 SEO 修复无关，未进入本次 commit。

---

提交记录：`main` 分支 `80427de`、`9d16c26`
