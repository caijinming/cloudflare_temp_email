# Current Deployment State

Last updated: `2026-03-31`

## Primary topology

This workspace now targets one production stack:

- API Worker: `danielyoung-temp-email-api`
- API custom domain: `https://api.danielyoung.top`
- Pages project: `danielyoung-temp-email`
- Pages default domains:
  - `https://danielyoung-temp-email.pages.dev`
  - `https://main.danielyoung-temp-email.pages.dev`
- Intended site custom domain: `https://mail.danielyoung.top`
- Unified D1 database:
  - Name: `danielyoung-temp-email`
  - ID: `90283ab6-845e-438f-9c17-70dce495ef84`

## Mailbox domains served by the unified deployment

The current unified Worker config serves these mailbox domains:

- `danielyoung.top`
- `davidclarks.xyz`
- `adavidclark.xyz`

These values are currently sourced from:

- `worker/wrangler.toml`
- `frontend/.env.prod`
- `frontend/.env.local`

## Active local config files

- Worker config: `worker/wrangler.toml`
- Frontend production env: `frontend/.env.prod`
- Frontend local env: `frontend/.env.local`
- Frontend dev proxy and settings guards:
  - `frontend/vite.config.js`
  - `frontend/src/api/index.js`

## Drift-sensitive deployment note

- `worker/wrangler.toml` currently uses `keep_vars = true`
- Because of that, checked-in config is not sufficient proof of the live Worker behavior
- Any future deploy verification must confirm the effective `GET /open_api/settings` response, especially:
  - `enableUserCreateEmail`
  - `disableAnonymousUserCreateEmail`
  - `domains`

## Effective runtime config snapshot

- Worker settings verified from `https://api.danielyoung.top/open_api/settings`
- Effective values currently confirmed:
  - `enableUserCreateEmail = true`
  - `disableAnonymousUserCreateEmail = false`
  - `defaultDomains = ["danielyoung.top", "davidclarks.xyz", "adavidclark.xyz"]`
  - `domains = ["danielyoung.top", "davidclarks.xyz", "adavidclark.xyz"]`
- Frontend custom-domain bundle currently points to:
  - `https://api.danielyoung.top`
- Frontend local and production env files are currently aligned to the custom API domain

## Current deployment status

### Confirmed working

- Worker deployed successfully under `danielyoung-temp-email-api`
- Worker custom domain `api.danielyoung.top` is active
- The unified API can create mailbox addresses for:
  - `danielyoung.top`
  - `davidclarks.xyz`
  - `adavidclark.xyz`
- Pages deployment for `danielyoung-temp-email` completed successfully
- Pages custom domain `https://mail.danielyoung.top` is active
- The live homepage bundle now references `https://api.danielyoung.top`
- Anonymous users should see the "Create New Email" entry because the effective Worker settings allow it

### Still pending

- Email Routing still needs to be confirmed per mailbox domain for:
  - `danielyoung.top`
  - `davidclarks.xyz`
  - `adavidclark.xyz`

## Required dashboard-side follow-up

These steps could not be completed through the current Wrangler OAuth token because it has `zone:read` but not DNS write permissions:

1. Add DNS record:
   - Type: `CNAME`
   - Name: `mail`
   - Target: `danielyoung-temp-email.pages.dev`
2. Confirm Pages finishes validating `mail.danielyoung.top` and issuing the final certificate
3. For each mailbox domain, enable `Email Routing`
4. For each mailbox domain, configure `Catch-all` to the unified Worker `danielyoung-temp-email-api`

## Legacy historical deployments

The account still contains earlier single-domain deployments:

- `davidclarks-temp-email-api` / `davidclarks-temp-email`
- `adavidclark-temp-email-api` / `adavidclark-temp-email`

These are historical references only. Future AI work should treat the `danielyoung` deployment as the primary production line unless the user explicitly changes strategy.
