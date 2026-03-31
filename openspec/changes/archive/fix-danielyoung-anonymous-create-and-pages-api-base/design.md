# Design: Anonymous-create and Pages API-base remediation

## Symptoms observed

- Homepage UI did not show the anonymous "Create New Email" entry.
- Browser console showed requests from `https://mail.danielyoung.top` to:
  - `https://danielyoung-temp-email-api.jinmcai-jobworks.workers.dev/open_api/settings`
- Those requests failed CORS in the browser because the site was running on the custom Pages domain while the frontend bundle still pointed at the historical `workers.dev` origin.

## Root cause breakdown

### Worker runtime config drift

The UI entry is controlled by the effective `GET /open_api/settings` response:

- `enableUserCreateEmail`
- `disableAnonymousUserCreateEmail`

The repository already had `ENABLE_USER_CREATE_EMAIL = true`, but the Worker config also uses `keep_vars = true`. That means Cloudflare can preserve old dashboard-side values unless the desired boolean is explicitly sent again on deploy.

### Stale Pages production bundle

The live `mail.danielyoung.top` site was still serving an older Pages bundle that referenced the old Worker URL:

- `https://danielyoung-temp-email-api.jinmcai-jobworks.workers.dev`

The current desired API origin for the unified deployment is:

- `https://api.danielyoung.top`

## Final config state

### Worker

- Config file: `worker/wrangler.toml`
- Effective settings:
  - `ENABLE_USER_CREATE_EMAIL = true`
  - `DISABLE_ANONYMOUS_USER_CREATE_EMAIL = false`
  - `DEFAULT_DOMAINS = ["danielyoung.top", "davidclarks.xyz", "adavidclark.xyz"]`
  - `DOMAINS = ["danielyoung.top", "davidclarks.xyz", "adavidclark.xyz"]`
  - `FRONTEND_URL = "https://mail.danielyoung.top"`

### Frontend

- Config files:
  - `frontend/.env.prod`
  - `frontend/.env.local`
- Effective API base:
  - `VITE_API_BASE=https://api.danielyoung.top`
- HTML metadata fix:
  - Add `<meta name="mobile-web-app-capable" content="yes">` in `frontend/index.html`

## Repair chain executed

1. Inspect UI display conditions in `frontend/src/views/common/Login.vue`.
2. Inspect Worker settings response in `worker/src/commom_api.ts`.
3. Set `DISABLE_ANONYMOUS_USER_CREATE_EMAIL = false` explicitly in `worker/wrangler.toml`.
4. Deploy Worker with an explicit Node 22 toolchain because the machine default `node` path still resolved to Node 18 for Wrangler.
5. Verify:
   - `https://api.danielyoung.top/open_api/settings`
   - `enableUserCreateEmail = true`
   - `disableAnonymousUserCreateEmail = false`
6. Rebuild frontend production assets.
7. Deploy Pages project `danielyoung-temp-email` using the rebuilt `frontend/dist`.
8. Verify live site HTML and live JS bundle:
   - `https://mail.danielyoung.top`
   - `https://mail.danielyoung.top/assets/index-CcWgkJiP.js`
9. Confirm the live JS bundle references:
   - `https://api.danielyoung.top`
   - and no longer references `jinmcai-jobworks.workers.dev`

## Known operational note

This workspace has a recurring environment-path hazard:

- `node -v` may differ from the Node version actually used by Wrangler
- the machine default `/usr/local/bin/node` was Node `18.17.0`
- the working Node toolchain for deploys was under:
  - `/Users/longhuadmin/.nvm/versions/node/v22.22.1/bin`

For production deploys, use an explicit Node 22 path when necessary.
