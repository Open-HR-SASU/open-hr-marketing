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

- **Project ID:** `tbkdha33` (ACTIVE)
- **Dataset:** `production`
- **Studio:** `./studio/` (run with `npm run dev` from studio directory)

Content is fetched at build time. All pages use `getPage(slug, locale)` to retrieve sections from Sanity.

### Configuration (CRITICAL)

| Setting | Value | Reason |
|---------|-------|--------|
| `projectId` | `tbkdha33` | Active project — **DO NOT** use `kg29oq3t` (disabled) |
| `useCdn` | `false` | Per Sanity docs, static builds need live API for fresh content |
| `apiVersion` | `2024-01-01` | Stable API version |

**RCA Reference:** OPE-393 — Clever Cloud deployed old commit with disabled project ID `kg29oq3t`, causing "Project Disabled" build errors.

### Key Document Types

| Type | Purpose |
|------|---------|
| `page` | Marketing pages with sections array |
| `section` | Reusable content sections (hero, features, CTA, etc.) |
| `navigationItem` | Header navigation links |
| `footer` | Footer columns and links |
| `siteSettings` | Global site configuration |

### Slug Conventions (CRITICAL)

**Homepage slug must be `home` for all locales.** The code queries `getPage('home', locale)` in `/src/pages/[locale]/index.astro`.

| Page | Expected Slug | Notes |
|------|---------------|-------|
| Homepage | `home` | NOT `/` — code expects literal `home` |
| About | `about` | |
| Workers | `workers` | |
| Pricing | `pricing` | |
| Pilot | `pilot` | |
| How It Works | `how-it-works` | |

**RCA Reference:** OPE-393 — Site fell back to hardcoded content for 5/6 locales because homepage slugs were `/` instead of `home`.

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
