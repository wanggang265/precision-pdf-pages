# Precision PDF

A focused PDF utility for removing unwanted pages.

This project is configured as a **static export** (`output: "export"`), so it can be deployed to **GitHub Pages** or served from **Cloudflare Workers** as static assets.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

The static site is generated in the `out/` directory.

## Tracking and public environment variables

If you want analytics, set these public variables at build time:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_CLARITY_ID`

If a variable is empty, its script is skipped.

### Current production config

For the current `removepdfpages.net` deployment, the active public values are:

```env
NEXT_PUBLIC_SITE_URL=https://removepdfpages.net
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=removepdfpages.net
NEXT_PUBLIC_GA_ID=G-FN1N7WEW6G
NEXT_PUBLIC_CLARITY_ID=x9kw6nmc07
NEXT_PUBLIC_AHREFS_ANALYTICS_ID=56u8uSJNKPgYFLNKSQAA9w
```

GSC is configured through the DNS TXT record and may still need time to finish verifying in Search Console.

## API boundary

- Frontend-only public values use `NEXT_PUBLIC_*`.
- Secrets and paid API keys stay in Cloudflare Workers Secrets.
- The browser should only talk to your own Worker when backend logic is needed.
- OpenRouter / fal.ai calls belong in the Worker backend, not in the frontend bundle.
- Keep API keys in Worker Secrets; the frontend must never contain provider keys.

## Frontend vs Worker handoff

### Frontend owns
- Page layout and UI copy
- Buttons, forms, and loading states
- Upload entry points and result presentation
- Calls to your own Worker API only

### Worker owns
- OpenRouter / fal.ai requests
- Secret/API key handling
- Validation, auth, and rate limiting
- Response shaping and error handling

### Handoff rule
- If the code touches provider keys or paid model calls, it belongs in Worker.
- If the code only changes what the user sees or submits, it belongs in the frontend.

## Deploy to GitHub Pages

Recommended for a simple static deployment.

### GitHub Pages setup

1. Push this repository to GitHub.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. The included workflow will:
   - check out the repo
   - install dependencies
   - run `npm run build`
   - upload the `out/` directory as the Pages artifact
   - deploy the artifact with `actions/deploy-pages`

### GitHub Pages URL

For this repo, the published site will usually be:

`https://wanggang265.github.io/precision-pdf-pages/`

### If the site does not load correctly

If you later rename the repository, update the `basePath` / `assetPrefix` logic in `next.config.ts`.

## Deploy to Cloudflare Workers

Cloudflare Workers is the preferred Cloudflare path for this repo.

### Recommended settings

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Static assets directory:** `out`

### Steps

1. Create a Cloudflare Workers project or connect the repo to an existing Worker.
2. Use the included `wrangler.toml`.
3. Run the build command above.
4. Deploy with Wrangler.
5. Attach the custom domain `removepdfpages.net` to the Worker.
6. In the registrar, change the domain's nameservers from the current Hostinger parking nameservers to the nameservers Cloudflare assigns.
7. Wait for DNS propagation, then verify that `/`, `/robots.txt`, and `/sitemap.xml` return your app instead of the parking page.

### Cloudflare note

This project remains static-export friendly, so the Worker only needs to serve the generated `out/` directory.

Secrets and paid API keys should live in Cloudflare Workers Secrets, not in the frontend bundle.

## Final release checklist

- [ ] `npm run build` passes locally
- [ ] GitHub Actions workflow is enabled
- [ ] GitHub Pages source is set to **GitHub Actions**
- [ ] Cloudflare Workers asset directory is set to `out`
- [ ] For a GitHub project page, the repo name matches the `basePath` logic in `next.config.ts`
- [ ] Separate `Privacy`, `Terms`, and `Contact` pages exist
- [ ] Footer links to `Privacy`, `Terms`, and `Contact` are present and working

## Reusable site bootstrap template

See `SITE_BOOTSTRAP_CN_STANDARD.md` for the standard workflow.
It includes code landing, legal pages, tracking, deployment, and API boundary checks.

## GitHub Pages first publish quick steps

1. Push to `main`.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Wait for the workflow to finish.
5. Open `https://wanggang265.github.io/precision-pdf-pages/`.

Note: the GitHub Actions workflow already works with the `basePath` logic in `next.config.ts`, so no extra Pages-specific build flags are needed.

## Cloudflare Pages first publish quick steps

1. Connect the GitHub repo to Cloudflare Pages.
2. Set **Framework preset** to **Static site**.
3. Set **Build command** to `npm run build`.
4. Set **Build output directory** to `out`.
5. Deploy and open the generated Cloudflare URL.

## Local Notes

- Development server: `npm run dev`
- Production build: `npm run build`
- Static output: `out/`

## Project Structure

- `app/` — routes and pages
- `components/` — shared UI
- `public/` — static assets

## More

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
