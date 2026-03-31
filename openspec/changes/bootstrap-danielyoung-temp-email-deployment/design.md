# Design: Current deployment state

## Target domain

- Domain: `danielyoung.top`
- Registrar: Alibaba Cloud
- Intended authoritative nameservers:
  - `lex.ns.cloudflare.com`
  - `paislee.ns.cloudflare.com`

## Created Cloudflare resources

- D1 database:
  - Name: `danielyoung-temp-email`
  - ID: `90283ab6-845e-438f-9c17-70dce495ef84`
- Worker:
  - Name: `danielyoung-temp-email-api`
  - URL: `https://danielyoung-temp-email-api.jinmcai-jobworks.workers.dev`
- Pages project:
  - Name: `danielyoung-temp-email`
  - URL: `https://danielyoung-temp-email.pages.dev`

## Local config files

- Worker config: `worker/wrangler.toml`
- Frontend env: `frontend/.env.local`

## Current local configuration

- `DEFAULT_DOMAINS=["danielyoung.top"]`
- `DOMAINS=["danielyoung.top"]`
- `FRONTEND_URL="https://danielyoung-temp-email.pages.dev"`
- `VITE_API_BASE="https://danielyoung-temp-email-api.jinmcai-jobworks.workers.dev"`

## Pending external steps

1. Wait until `danielyoung.top` nameservers resolve to Cloudflare.
2. In Cloudflare zone `danielyoung.top`, enable `Email Routing`.
3. Add the required `MX` and verification records from Cloudflare Email Routing.
4. Verify a real destination mailbox in Email Routing.
5. Create a `Catch-all` rule that delivers mail to Worker `danielyoung-temp-email-api`.

## Resume checklist

When resuming, verify:

1. `dig ns danielyoung.top` returns the two Cloudflare nameservers.
2. `wrangler whoami` is still authenticated.
3. Worker URL responds.
4. Pages URL responds.
5. Email Routing has been enabled for the zone.
