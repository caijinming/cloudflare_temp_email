# Tasks: Bootstrap danielyoung.top temp mail deployment

- [x] Clone repository locally
- [x] Switch git remote to SSH
- [x] Install `wrangler`
- [x] Authenticate `wrangler`
- [x] Create D1 database
- [x] Apply `db/schema.sql` to D1
- [x] Create `worker/wrangler.toml`
- [x] Deploy Worker `danielyoung-temp-email-api`
- [x] Create `frontend/.env.local`
- [x] Build frontend locally
- [x] Create Pages project `danielyoung-temp-email`
- [x] Deploy frontend to Pages
- [x] Confirm nameserver cutover for `danielyoung.top`
- [x] Enable Cloudflare Email Routing on `danielyoung.top`
- [x] Verify a destination mailbox in Email Routing
- [x] Route `Catch-all` mail to Worker `danielyoung-temp-email-api`
- [x] End-to-end verify mail delivery to a generated address
