# Site Bootstrap Template

Use this template when starting a new product site.

## Required pages
- [ ] Home
- [ ] Privacy
- [ ] Terms
- [ ] Contact

## Required footer links
- [ ] Privacy
- [ ] Terms
- [ ] Contact

## Required tracking
- [ ] Plausible
- [ ] GA4
- [ ] Clarity
- [ ] GSC verification planned via DNS TXT (may take time to propagate)

## Required deployment
- [ ] GitHub Pages or Cloudflare Workers selected
- [ ] Build passes locally
- [ ] Production URL verified
- [ ] Error-free console check

## API boundary
- [ ] Frontend only handles UI and submission
- [ ] Worker handles provider keys and paid API calls
- [ ] Secrets never enter the frontend bundle

## Common env vars
- [ ] NEXT_PUBLIC_SITE_URL
- [ ] NEXT_PUBLIC_PLAUSIBLE_DOMAIN
- [ ] NEXT_PUBLIC_GA_ID
- [ ] NEXT_PUBLIC_CLARITY_ID

## Final checklist
- [ ] Legal pages exist and are linked
- [ ] Tracking IDs are configured
- [ ] Deployment target is live
- [ ] Worker API boundary is documented
- [ ] README has setup and deployment steps
