# Bunny CDN Security Headers Configuration

## OPE-433: Add Security Headers to BunnyCDN

This document provides step-by-step instructions for configuring security headers on the Open HR marketing site via Bunny CDN Edge Rules.

## Required Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| Content-Security-Policy | See below | Prevent XSS, data injection attacks |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` | Force HTTPS |
| X-Frame-Options | `DENY` | Prevent clickjacking |
| X-Content-Type-Options | `nosniff` | Prevent MIME sniffing |
| Referrer-Policy | `strict-origin-when-cross-origin` | Control referrer information |

## Content-Security-Policy Value

```
default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://app.open-hr.work https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://app.open-hr.work; upgrade-insecure-requests
```

**Breakdown:**
- `default-src 'self'` - Only allow resources from same origin by default
- `script-src 'self' 'unsafe-inline' https://plausible.io` - Allow scripts from self, inline (Astro), and Plausible analytics
- `style-src 'self' 'unsafe-inline'` - Allow styles from self and inline (Tailwind)
- `img-src 'self' data: https:` - Allow images from self, data URIs, and any HTTPS
- `font-src 'self'` - Fonts only from self (Fontsource)
- `connect-src 'self' https://app.open-hr.work https://plausible.io` - API calls to platform and analytics
- `frame-ancestors 'none'` - Same as X-Frame-Options: DENY
- `base-uri 'self'` - Prevent base tag injection
- `form-action 'self' https://app.open-hr.work` - Form submissions to self and platform
- `upgrade-insecure-requests` - Upgrade HTTP to HTTPS automatically

## Configuration via Bunny Dashboard

### Step 1: Access Edge Rules

1. Log in to [bunny.net Dashboard](https://dash.bunny.net)
2. Navigate to **CDN** > **Pull Zones**
3. Select the `open-hr-marketing` pull zone
4. Click **Edge Rules** tab

### Step 2: Create Edge Rule for Security Headers

1. Click **Add Edge Rule**
2. Configure the rule:
   - **Name:** `Security Headers`
   - **Description:** `Add security headers to all responses (OPE-433)`

3. **Triggers:**
   - Leave empty to apply to all requests
   - OR add `Match URL Pattern: *` to explicitly match all

4. **Actions:**
   For each header, add an action:

   | Action Type | Header Name | Header Value |
   |-------------|-------------|--------------|
   | Set Response Header | `Content-Security-Policy` | (CSP value above) |
   | Set Response Header | `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
   | Set Response Header | `X-Frame-Options` | `DENY` |
   | Set Response Header | `X-Content-Type-Options` | `nosniff` |
   | Set Response Header | `Referrer-Policy` | `strict-origin-when-cross-origin` |

5. Click **Save**

### Step 3: Verify Configuration

After saving, purge the CDN cache and verify headers:

```bash
# Purge cache (requires API key)
curl -X POST "https://api.bunny.net/pullzone/PULL_ZONE_ID/purgeCache" \
  -H "AccessKey: YOUR_API_KEY"

# Verify headers
curl -I https://open-hr.work
```

Expected response should include all security headers.

## Configuration via API

If you prefer to use the Bunny API:

```bash
# Get API key from Access Keys directory
API_KEY="7ec9d309-4951-4a5c-9320-9b7586de4fa92fa5edea-6fcb-465f-b654-5a319763d09a"

# Get Pull Zone ID
curl -s "https://api.bunny.net/pullzone" \
  -H "AccessKey: $API_KEY" | jq '.[] | select(.Name == "open-hr-marketing") | .Id'

# Add Edge Rule via API
PULL_ZONE_ID="YOUR_PULL_ZONE_ID"

curl -X POST "https://api.bunny.net/pullzone/$PULL_ZONE_ID/edgerules/addOrUpdate" \
  -H "Content-Type: application/json" \
  -H "AccessKey: $API_KEY" \
  -d '{
    "Guid": null,
    "ActionType": 3,
    "ActionParameter1": "Content-Security-Policy",
    "ActionParameter2": "default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\'' https://plausible.io; style-src '\''self'\'' '\''unsafe-inline'\''; img-src '\''self'\'' data: https:; font-src '\''self'\''; connect-src '\''self'\'' https://app.open-hr.work https://plausible.io; frame-ancestors '\''none'\''; base-uri '\''self'\''; form-action '\''self'\'' https://app.open-hr.work; upgrade-insecure-requests",
    "Triggers": [],
    "TriggerMatchingType": 0,
    "Description": "Security Headers - CSP",
    "Enabled": true
  }'
```

**Edge Rule Action Types:**
- `3` = Set Response Header
- `ActionParameter1` = Header name
- `ActionParameter2` = Header value

Repeat for each header.

## Verification Checklist

After configuration, verify using security header scanners:

- [ ] [Security Headers](https://securityheaders.com/?q=open-hr.work) - Should show A or A+ grade
- [ ] [Mozilla Observatory](https://observatory.mozilla.org/analyze/open-hr.work) - Should pass CSP checks
- [ ] Manual curl check shows all headers present

## Rollback

To remove security headers:
1. Go to Edge Rules in Bunny Dashboard
2. Delete or disable the "Security Headers" rule
3. Purge cache

## Related Resources

- [Bunny Edge Rules Documentation](https://support.bunny.net/hc/en-us/sections/360000374812-Edge-Rules)
- [Mozilla CSP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)

## Linear Issue

- **OPE-433** - Add Security Headers to BunnyCDN
