# Precision PDF

A focused PDF utility for removing unwanted pages.

This project is configured as a **static export** (`output: "export"`), so it can be deployed to **GitHub Pages** or **Cloudflare Pages**.

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

## Deploy to Cloudflare Pages

Cloudflare Pages also works well with this project.

### Recommended settings

- **Framework preset:** Static site
- **Build command:** `npm run build`
- **Build output directory:** `out`

### Steps

1. Connect the GitHub repo to Cloudflare Pages.
2. Set the build settings above.
3. Deploy.
4. Attach a custom domain if needed.

### Cloudflare note

This project is static-export friendly, so no extra server settings are needed.

## Final release checklist

- [ ] `npm run build` passes locally
- [ ] GitHub Actions workflow is enabled
- [ ] GitHub Pages source is set to **GitHub Actions**
- [ ] Cloudflare Pages build output is set to `out`
- [ ] For a GitHub project page, the repo name matches the `basePath` logic in `next.config.ts`

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
