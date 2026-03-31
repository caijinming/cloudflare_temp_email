# Unified Deployment Bootstrap Guide

This guide exists so a future AI can rebuild the current target topology from a fresh clone without relying on chat history.

## Goal

Bootstrap one site and one API that serve three mailbox domains:

- Site: `mail.danielyoung.top`
- API: `api.danielyoung.top`
- Mailbox domains:
  - `danielyoung.top`
  - `davidclarks.xyz`
  - `adavidclark.xyz`

## Canonical local files

Always start from these files:

- `worker/wrangler.toml`
- `frontend/.env.prod`
- `frontend/.env.local`
- `frontend/vite.config.js`
- `frontend/src/api/index.js`

Do not start from the archived single-domain files unless the user explicitly wants to restore a legacy deployment.

## Zero-to-one sequence

1. Ensure local Node is `22.12+` or another version accepted by Vite 7 and Wrangler 4.
2. Run `wrangler whoami` and confirm the target Cloudflare account is authenticated.
3. Create or confirm the target D1 database.
4. Apply `db/schema.sql` to the D1 database.
5. Configure `worker/wrangler.toml`:
   - Worker name
   - D1 binding
   - `DOMAINS`
   - `DEFAULT_DOMAINS`
   - `FRONTEND_URL`
   - route for `api.<site-domain>`
   - `JWT_SECRET`
6. Deploy the Worker.
7. Build the frontend using the production API domain in `frontend/.env.prod`.
8. Deploy the frontend to the target Pages project.
9. Add the Pages custom domain `mail.<site-domain>`.
10. Add the required DNS record for the Pages custom domain.
11. Enable `Email Routing` for every mailbox domain.
12. For every mailbox domain, create a `Catch-all` rule that delivers to the same Worker.
13. Verify:
   - `GET /health_check`
   - `GET /open_api/settings`
   - `POST /api/new_address` for every mailbox domain
   - end-to-end mail delivery and API retrieval

## Verification checklist

### Worker

- `https://api.danielyoung.top/health_check` returns `200`
- `https://api.danielyoung.top/open_api/settings` returns the expected effective config:
  - `enableUserCreateEmail = true`
  - `disableAnonymousUserCreateEmail = false`
  - `domains` includes all mailbox domains
- `POST https://api.danielyoung.top/api/new_address` can create addresses under all three mailbox domains

### Pages

- `https://danielyoung-temp-email.pages.dev` opens
- `https://mail.danielyoung.top` opens after custom-domain validation completes

### Mail routing

- Every mailbox domain has Email Routing enabled
- Every mailbox domain has a valid destination mailbox
- Every mailbox domain routes `Catch-all` to the unified Worker

## Known pitfalls

### Pitfall: wrong Node version despite `node -v` looking correct

Observed failure mode:

- Vite and Wrangler still run on Node 18 because the environment exports `NODE=/usr/local/bin/node`

Mitigation:

- Check both `node -v` and `npm run env`
- If needed, unset the injected variables when running build/deploy commands:
  - `env -u NODE -u npm_node_execpath ...`
- Prefer an explicit Node 22 path when the environment is polluted

### Pitfall: frontend loads but "create mailbox" entry is missing

Observed failure mode:

- `/open_api/settings` did not return valid `domains` or `enableUserCreateEmail`
- The UI hid the create-mailbox entry because it depends on those settings

Mitigation:

- Verify the frontend is talking to the Worker, not the Vite dev server
- Verify `DOMAINS` and `ENABLE_USER_CREATE_EMAIL` are set in Worker config
- Verify the effective deployed response from `/open_api/settings`, not only `worker/wrangler.toml`
- The repo now includes a local dev proxy in `frontend/vite.config.js`

### Pitfall: checked-in Worker vars look correct but production still behaves like the old config

Observed failure mode:

- `worker/wrangler.toml` contains the intended values
- Cloudflare still serves behavior from older dashboard-side vars
- `keep_vars = true` allows previous values to survive a later deploy unless the new value is explicitly sent

Mitigation:

- Treat `worker/wrangler.toml` as desired state, not proof of effective state
- For drift-sensitive booleans, set the intended value explicitly instead of relying on an omitted key
- After every deploy, verify `/open_api/settings`
- If the UI behavior and repo config disagree, debug the deployed API response first

### Pitfall: repo config is correct but the live Pages site still calls the old API origin

Observed failure mode:

- `frontend/.env.prod` is already correct locally
- the live custom-domain site still serves an older JS bundle
- the browser keeps calling a historical `workers.dev` origin and fails CORS

Mitigation:

- Rebuild the frontend before deploying Pages
- Deploy the Pages project explicitly from `frontend/dist`
- Verify the live deployed HTML and JS bundle, not only the local build output
- For the `danielyoung` deployment, the expected live API origin is `https://api.danielyoung.top`

### Pitfall: runtime error `Cannot read properties of undefined (reading 'map')`

Observed failure mode:

- `domains` was missing from `/open_api/settings`
- The frontend attempted to map over an undefined value

Mitigation:

- `frontend/src/api/index.js` now guards against malformed settings responses
- Even with the guard, the root cause is usually a broken API base or missing Worker `DOMAINS`

### Pitfall: Pages deploy succeeds but custom site domain still fails

Observed failure mode:

- Pages deployment succeeds
- Custom domain remains pending with `CNAME record not set`

Mitigation:

- Add the required `CNAME` from `mail.<site-domain>` to the Pages default hostname
- Do not assume `wrangler pages deploy` also provisions DNS

### Pitfall: Worker supports three mailbox domains but only one domain actually receives mail

Observed failure mode:

- The Worker `DOMAINS` list includes multiple mailbox domains
- Only one domain receives messages because Email Routing was configured on only one zone

Mitigation:

- `DOMAINS` controls application behavior only
- Cloudflare `Email Routing` must still be configured separately for every mailbox domain

### Pitfall: committing a live JWT secret

Observed failure mode:

- A deploy is made convenient by writing a live `JWT_SECRET` into `worker/wrangler.toml`

Mitigation:

- Before any public push, rotate the secret
- Prefer Cloudflare-managed secret storage for long-lived production use
- Treat repo-stored secrets as temporary bootstrap state only
