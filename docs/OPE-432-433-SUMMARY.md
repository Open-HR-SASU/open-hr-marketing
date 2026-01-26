# OPE-432 & OPE-433 Implementation Summary

## Date: 2026-01-26

---

## OPE-432: Fix app.open-hr.work/login 404

### Root Cause Analysis

The Open HR architecture has split into:
- **Marketing site** (Astro/static) at `open-hr.work` - Bunny CDN
- **Platform API** (Go + Fiber) at `app.open-hr.work` - Clever Cloud

The Go platform is **API-only** - it serves JSON at `/api/*` endpoints. The `/login` route returned 404 because:
1. The Go backend doesn't serve HTML pages
2. The Next.js platform (which had the login page) is deprecated (DL-29)
3. Web authentication pages hadn't been ported to the new architecture

### Solution Implemented

**Two-part fix:**

1. **Go Backend Redirects** (`apps/platform-go/`)
   - Added page redirect handlers to redirect web auth routes to marketing site
   - Routes `/login`, `/register`, `/forgot-password` redirect to `open-hr.work/[locale]/login` etc.

2. **Marketing Site Auth Pages** (`marketing/`)
   - Created login page at `/[locale]/login` for all 6 locales
   - React island component for interactive form
   - Calls platform API at `app.open-hr.work/api/auth/login`

### Files Changed

**Go Platform (`apps/platform-go/`):**
- `internal/handlers/auth/pages.go` - NEW: Page redirect handlers
- `internal/handlers/auth/login.go` - NEW: Login API handler
- `cmd/server/main.go` - Added page redirects and login route

**Marketing Site (`marketing/`):**
- `src/components/islands/LoginForm.tsx` - NEW: Login form component
- `src/pages/[locale]/login.astro` - NEW: Login page for all locales

### Flow After Fix

1. User visits `app.open-hr.work/login`
2. Go backend redirects (307) to `open-hr.work/fr/login`
3. Marketing site serves static login page with React hydration
4. Form submits to `app.open-hr.work/api/auth/login`
5. On success, user redirected to `app.open-hr.work/app/dashboard`

### Verification

```bash
# Test redirect from platform
curl -I https://app.open-hr.work/login
# Expected: 307 Temporary Redirect to https://open-hr.work/fr/login

# Test login page
curl -I https://open-hr.work/fr/login
# Expected: 200 OK

# Test login API
curl -X POST https://app.open-hr.work/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## OPE-433: Add Security Headers to BunnyCDN

### Required Security Headers

| Header | Value |
|--------|-------|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; ...` |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |

### Documentation Created

Full step-by-step instructions created at:
`marketing/docs/BUNNY-SECURITY-HEADERS.md`

Includes:
- Dashboard configuration steps
- API configuration commands
- CSP policy breakdown
- Verification checklist

### Action Required

Security headers must be configured manually in Bunny Dashboard:
1. Login to dash.bunny.net
2. Navigate to Pull Zones > open-hr-marketing > Edge Rules
3. Add Edge Rule with security headers (see docs)
4. Purge cache and verify

### Bunny API Key Location

```
/Users/johnathenevans/Documents/Open HR/_REORGANIZATION_2025/EXECUTION/Access Keys/bunny.txt
```

---

## Next Steps

1. **Deploy Go changes** - Push to Clever Cloud
2. **Deploy marketing changes** - Push to main branch (auto-deploys to Bunny)
3. **Configure security headers** - Follow `BUNNY-SECURITY-HEADERS.md`
4. **Verify** - Test login flow end-to-end
5. **Update Linear** - Close OPE-432 and OPE-433

---

## Related Linear Issues

- OPE-432 - Fix app.open-hr.work/login 404
- OPE-433 - Add Security Headers to BunnyCDN
- DL-29 - Go + Fiber Platform Migration
