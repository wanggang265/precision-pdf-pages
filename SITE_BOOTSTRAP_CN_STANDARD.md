# 建站标准模板（中文版）

适用于以后每一个新站点。先看这份，能快速判断是否漏项。

## 1. 代码落地：设计稿变 React 组件

- [ ] 先识别页面结构，再写代码
- [ ] 一个 section 尽量对应一个组件
- [ ] 重复结构抽成通用组件
- [ ] 有交互的部分单独做 client component
- [ ] 展示型组件默认不加 `use client`
- [ ] 只在真正需要 state / onClick / 表单时才加 `use client`
- [ ] 先拆 section，再组装页面，不要把整页 HTML 塞进一个文件
- [ ] 设计稿里的占位 href / 按钮全部替换成真实链接或真实动作
- [ ] 子页面底部最好有交叉导航，避免用户迷路
- [ ] 图片、字体、favicon 等资源先放到规范位置再引用

推荐组件结构：
- `components/layout/`：Header、Footer、SiteShell
- `components/sections/`：Hero、Features、FAQ、CTA 等页面区块
- `components/ui/`：Button、Card、Badge 等基础组件

## 2. 页面标配
- [ ] Home
- [ ] Privacy
- [ ] Terms
- [ ] Contact

## 3. Footer 标配链接
- [ ] Privacy
- [ ] Terms
- [ ] Contact
- [ ] 邮箱 / 支持入口

## 4. 追踪标配
- [ ] Plausible
- [ ] GA4
- [ ] Clarity
- [ ] GSC（后续验证与提交 sitemap；DNS TXT 验证可能需要等待传播）

## 5. 部署标配
- [ ] 本地 build 通过
- [ ] 线上地址可访问
- [ ] 控制台无报错
- [ ] 已选择部署目标：GitHub Pages 或 Cloudflare Workers

## 6. API 边界标配
- [ ] 前端只负责 UI、表单、状态展示
- [ ] Worker 负责 provider keys、付费 API 调用、鉴权、限流
- [ ] Secrets 不进前端 bundle
- [ ] OpenRouter / fal.ai 这类调用放 Worker

## 7. 常用公开变量
- [ ] NEXT_PUBLIC_SITE_URL
- [ ] NEXT_PUBLIC_PLAUSIBLE_DOMAIN
- [ ] NEXT_PUBLIC_GA_ID
- [ ] NEXT_PUBLIC_CLARITY_ID

## 8. 最终快速验收
- [ ] 首页能打开
- [ ] Privacy / Terms / Contact 都能打开
- [ ] Footer 链接都能点通
- [ ] 追踪 ID 已配置或明确空置
- [ ] README 有部署说明
- [ ] 如果是 Workers 路线，wrangler 配置已准备好

## 9. 复用规则
- 新站默认先补这三页：Privacy / Terms / Contact
- 新站默认先定清楚前端 / Worker 边界
- 新站默认先留追踪位，再填具体 ID
- 新站默认先跑本地 build，再谈上线
