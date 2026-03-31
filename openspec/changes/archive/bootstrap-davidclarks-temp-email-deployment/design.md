# Design: Current deployment state for davidclarks.xyz

## Target domain

- Domain: `davidclarks.xyz`
- Intended authoritative nameservers: Cloudflare (pending cutover)

## Created Cloudflare resources

- D1 database:
  - Name: `davidclarks-temp-email`
  - ID: `c9fb896f-4ef5-4aba-87d9-db5b7311af09`
- Worker:
  - Name: `davidclarks-temp-email-api`
  - URL: `https://davidclarks-temp-email-api.jinmcai-jobworks.workers.dev`
- Pages project:
  - Name: `davidclarks-temp-email`
  - URL: `https://davidclarks-temp-email.pages.dev`

## Local config files

- Worker config: `worker/wrangler.davidclarks.toml`
- Frontend env: `frontend/.env.davidclarks`

## Current configuration

- `DEFAULT_DOMAINS=["davidclarks.xyz"]`
- `DOMAINS=["davidclarks.xyz"]`
- `FRONTEND_URL="https://davidclarks-temp-email.pages.dev"`
- `VITE_API_BASE="https://davidclarks-temp-email-api.jinmcai-jobworks.workers.dev"`

## Pending external steps

1. Wait until `davidclarks.xyz` nameservers resolve to Cloudflare.
2. In Cloudflare zone `davidclarks.xyz`, enable `Email Routing`.
3. Add required `MX` and verification records from Cloudflare Email Routing.
4. Verify a real destination mailbox in Email Routing.
5. Create a `Catch-all` rule that delivers mail to Worker `davidclarks-temp-email-api`.

## Resume checklist

1. `dig ns davidclarks.xyz` returns Cloudflare nameservers.
2. `wrangler whoami` is still authenticated.
3. Worker URL responds OK: `https://davidclarks-temp-email-api.jinmcai-jobworks.workers.dev/health_check`
4. Pages URL responds: `https://davidclarks-temp-email.pages.dev`
5. Email Routing has been enabled for the zone.
