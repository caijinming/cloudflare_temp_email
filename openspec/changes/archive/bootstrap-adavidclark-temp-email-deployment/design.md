# Design: Current deployment state for adavidclark.xyz

## Target domain

- Domain: `adavidclark.xyz`
- Intended authoritative nameservers: Cloudflare (pending cutover)

## Created Cloudflare resources

- D1 database:
  - Name: `adavidclark-temp-email`
  - ID: `e318b1fa-47e2-47ab-952e-9ca688978306`
- Worker:
  - Name: `adavidclark-temp-email-api`
  - URL: `https://adavidclark-temp-email-api.jinmcai-jobworks.workers.dev`
- Pages project:
  - Name: `adavidclark-temp-email`
  - URL: `https://adavidclark-temp-email.pages.dev`

## Local config files

- Worker config: `worker/wrangler.adavidclark.toml`
- Frontend env: `frontend/.env.adavidclark`

## Current configuration

- `DEFAULT_DOMAINS=["adavidclark.xyz"]`
- `DOMAINS=["adavidclark.xyz"]`
- `FRONTEND_URL="https://adavidclark-temp-email.pages.dev"`
- `VITE_API_BASE="https://adavidclark-temp-email-api.jinmcai-jobworks.workers.dev"`

## Pending external steps

1. Wait until `adavidclark.xyz` nameservers resolve to Cloudflare.
2. In Cloudflare zone `adavidclark.xyz`, enable `Email Routing`.
3. Add required `MX` and verification records from Cloudflare Email Routing.
4. Verify a real destination mailbox in Email Routing.
5. Create a `Catch-all` rule that delivers mail to Worker `adavidclark-temp-email-api`.

## Resume checklist

1. `dig ns adavidclark.xyz` returns Cloudflare nameservers.
2. `wrangler whoami` is still authenticated.
3. Worker URL responds OK: `https://adavidclark-temp-email-api.jinmcai-jobworks.workers.dev/health_check`
4. Pages URL responds: `https://adavidclark-temp-email.pages.dev`
5. Email Routing has been enabled for the zone.
