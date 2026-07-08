<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:removepdfpages-token-troubleshooting -->
# removepdfpages.net: Token 失效与 401 处理规范

> 针对任何在 removepdfpages.net 前后端代码中遇到 `401 Unauthorized` / `Invalid token` / `token expired` / `token invalidated` 等认证错误的 agent。

## 1. 首先确认：是哪一种 token 在报错？

不要混用。removepdfpages.net 同时存在以下 token，401 来源可能完全不同：

1. **Cloudflare JWT** — 由 `JWT_SECRET` 签发，用于用户会话（`session` cookie）。
2. **Creem API Key** — 后端调用 `api.creem.io` 时使用的 `x-api-key`。
3. **D1 数据库 token** — 无传统 token，D1 通过 `env.DB` 绑定访问，不存在 401。
4. **第三方 API token** — 如 OpenAI、其他支付或外部服务，按对应服务文档处理。

## 2.  Cloudflare JWT 相关：401 / token expired / token invalidated

### 2.1 立即检查清单
- 当前用户的 `session` cookie 是否已过期？默认 `maxAge: 60 * 60 * 24 * 7`（7 天）。
- 当前用户的 `user_id` 是否仍在 D1 `users` 表中存在？若用户已删除或 `user_id` 不存在，token 会失效。
- `JWT_SECRET` 是否被修改？`JWT_SECRET` 是签名密钥，修改后之前所有 token 都会失效。
- 是否跨前后端/环境使用了 cookie？开发前端与生产后端域名不同会导致 cookie 不互通。

### 2.2 处理规范
- 后端收到 JWT 401 时，必须返回 `401 Unauthorized` 并在响应体中明确：
  ```json
  { "error": "Token expired or invalid", "code": "TOKEN_INVALID" }
  ```
- 前端收到 `TOKEN_INVALID` 后，必须：
  1. 清除本地 `session` cookie。
  2. 跳转到 `/login`。
  3. 不要自动重试原请求。
- 禁止：前端用任何方式“猜测”JWT 密钥或伪造 token；后端不要为了方便而延长 JWT 有效期超过 7 天。

### 2.3 调试命令
```bash
# 列出后端 Worker 的 secrets
wrangler secret list --name removepdfpages-workers

# 检查当前环境变量
wrangler var list --name removepdfpages-workers

# 查看 D1 中用户是否存在
npx wrangler d1 execute removepdfpages-db --command="SELECT user_id, email, created_at FROM users WHERE user_id='...'"
```

## 3. Creem API Key 相关：401 / Invalid API key

### 3.1 立即检查清单
- 当前使用环境是 production 还是 test？
  - Production: `https://api.creem.io`
  - Test: `https://api.test.creem.io`
- `CREEM_API_KEY` 是否与环境匹配？生产 key 不能在 test 环境使用，反之亦然。
- key 是否已过期、被吊销、或重新生成过？重新生成后旧 key 立即失效。
- 后端是否错误地把 `CREEM_API_KEY` 返回给前端？前端绝不应持有此 key。

### 3.2 处理规范
- 后端调用 Creem 时，只在 `Authorization: Bearer <CREEM_API_KEY> ` 或 `x-api-key: <CREEM_API_KEY>` 中使用 key（按 Creem 实际文档）。
- 后端必须对 Creem 401 做统一包装：
  ```json
  { "error": "Payment provider authentication failed", "code": "CREEM_AUTH_FAILED" }
  ```
- 前端收到 `CREEM_AUTH_FAILED` 后，只显示用户友好的支付失败提示，不要暴露 API key 或 Creem 内部错误。

### 3.3 调试命令
```bash
# 检查 Creem key 配置
wrangler secret list --name removepdfpages-workers | grep CREEM

# 测试 Creem API 连通性（仅后端安全环境）
curl -s -H "x-api-key: <CREEM_API_KEY>" https://api.creem.io/v1/products
```

## 4. 通用排查 SOP（任何 401 都可以走）

1. **复现并记录完整请求**：URL、方法、请求头（去掉敏感 key）、响应状态码、响应体。
2. **定位 token 类型**：是 session cookie、Creem key、还是第三方 key？
3. **检查有效期**：token 是否过期？账户是否被禁用？密钥是否被轮换？
4. **检查环境一致性**：dev / staging / prod 是否混用？
5. **检查代码变更**：最近是否修改过 `JWT_SECRET`、API key、cookie 设置、CORS 或跨域逻辑？
6. **检查日志**：
   - 后端：`wrangler tail --name removepdfpages-workers`
   - 前端：浏览器 Network 面板 + Console。
7. **修复后验证**：
   - 清除旧 cookie / 缓存后重新登录。
   - 用新 token 重放失败请求。
   - 检查是否仍有 401 复现。

## 5. 禁止行为

- 不要把 `JWT_SECRET` 或 `CREEM_API_KEY` 等 secrets 写入代码、日志、前端或聊天记录。
- 不要随意缩短或延长 JWT 有效期来“绕过”问题。
- 不要在前端存储或处理 Creem API key。
- 不要用同一个 secret 同时用于签名和加密。
- 不要在未验证的情况下删除用户 token 或重新生成 key（这可能导致所有用户掉线）。

## 6. 相关环境变量与密钥名

| 名称 | 用途 | 存储位置 |
|---|---|---|
| `JWT_SECRET` | 签名 session cookie | Worker secrets |
| `CREEM_API_KEY` | 调用 Creem 支付 API | Worker secrets |
| `CREEM_API_BASE_URL` | Creem API 基础地址（prod/test） | Worker env vars |
| `SESSION_COOKIE_NAME` | session cookie 名称（默认 `session`） | 代码常量 |

## 7. 提交前自检

- [ ] 所有 401 路径都返回明确 error code，不会泄露底层 secret。
- [ ] 前端在 401 后统一跳转登录，不会陷入无限重试循环。
- [ ] 没有新的 secret 被硬编码或打印到日志。
- [ ] JWT 和 Creem key 的调试/测试命令已在本机执行并验证通过。

<!-- END:removepdfpages-token-troubleshooting -->
