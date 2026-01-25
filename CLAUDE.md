# Open HR Marketing Site

## Overview

Pure static HTML marketing website built with Astro, connected to Sanity CMS.

**Deployment:** Bunny Edge Storage (France)
**Domains:** `open-hr.work`, `www.open-hr.work`

## Architecture

```
src/
├── components/
│   ├── Header.astro          # Navigation (fetches from Sanity)
│   ├── Footer.astro          # Footer (fetches from Sanity)
│   ├── Mark.astro            # Open HR logo mark
│   ├── islands/              # React hydrated components
│   │   ├── MobileNav.tsx
│   │   ├── PilotSignupForm.tsx
│   │   └── PricingSection.tsx
│   └── sections/             # CMS-driven section components
│       ├── HeroSection.astro
│       ├── FeaturesSection.astro
│       ├── CTASection.astro
│       ├── ContentSection.astro
│       └── SectionsRenderer.astro
├── layouts/
│   ├── Layout.astro          # Base HTML layout
│   └── MainLayout.astro      # Layout with header/footer
├── lib/
│   ├── i18n/                 # Locale configuration
│   └── sanity/               # Sanity client and queries
├── pages/
│   ├── index.astro           # Redirect to default locale
│   ├── 404.astro
│   └── [locale]/             # Locale-prefixed pages
│       ├── index.astro       # Homepage
│       ├── about.astro
│       ├── workers.astro
│       ├── pricing.astro
│       ├── pilot.astro
│       ├── how-it-works.astro
│       └── legal/[...slug].astro
└── styles/
    └── globals.css           # Tailwind + Open HR design tokens
```

## Sanity CMS

- **Project ID:** `kg29oq3t`
- **Dataset:** `production`

Content is fetched at build time. All pages use `getPage(slug, locale)` to retrieve sections from Sanity.

### Key Document Types

| Type | Purpose |
|------|---------|
| `page` | Marketing pages with sections array |
| `section` | Reusable content sections (hero, features, CTA, etc.) |
| `navigationItem` | Header navigation links |
| `footer` | Footer columns and links |
| `siteSettings` | Global site configuration |

## Locales

Supports 6 locales: `fr`, `en-GB`, `en-US`, `de`, `es`, `it`

Default locale: `fr` (France-first per DL-26 geo-restriction)

## Commands

```bash
npm install     # Install dependencies
npm run dev     # Development server (http://localhost:4321)
npm run build   # Production build (outputs to dist/)
npm run preview # Preview production build locally
```

## Deployment

**GitHub Actions** deploys to Bunny Edge Storage on push to `main`.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `BUNNY_STORAGE_ZONE` | Storage zone name |
| `BUNNY_STORAGE_KEY` | Storage API key (FTP password) |
| `BUNNY_STORAGE_HOSTNAME` | `storage.bunnycdn.com` (Frankfurt EU) |
| `BUNNY_API_KEY` | Account API key for cache purge |
| `BUNNY_PULL_ZONE_ID` | Pull zone ID for cache purge |

### Manual Deployment

```bash
# Build
npm run build

# Deploy (requires bunny-storage-deploy)
npx bunny-storage-deploy \
  --source ./dist \
  --destination / \
  --storage-zone "$BUNNY_STORAGE_ZONE" \
  --access-key "$BUNNY_STORAGE_KEY" \
  --storage-endpoint storage.bunnycdn.com
```

## Design System

- **Primary color:** Teal 900 (`#006064`)
- **Typography:** Bricolage Grotesque (headings), Instrument Sans (body)
- **Framework:** Tailwind CSS v4

## Related Resources

| Resource | URL |
|----------|-----|
| Platform Repo | [Open-HR-SASU/open-hr-website](https://github.com/Open-HR-SASU/open-hr-website) |
| CMS Repo | [Open-HR-SASU/open-hr-cms](https://github.com/Open-HR-SASU/open-hr-cms) |
| Linear | [open-hr.linear.app](https://linear.app/open-hr) |
| Sanity Studio | [open-hr.sanity.studio](https://open-hr.sanity.studio) |

## Geo-Restriction (DL-26)

Site is France-only during pilot phase. Bunny CDN Edge Rules handle geo-restriction automatically. Token bypass available for foreign references via `?geo_bypass={token}` parameter.
