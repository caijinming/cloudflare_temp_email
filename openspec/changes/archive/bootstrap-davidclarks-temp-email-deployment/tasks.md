# Tasks: Bootstrap davidclarks.xyz temp mail deployment

- [x] Create D1 database `davidclarks-temp-email`
- [x] Apply `db/schema.sql` to D1
- [x] Create `worker/wrangler.davidclarks.toml`
- [x] Deploy Worker `davidclarks-temp-email-api`
- [x] Create `frontend/.env.davidclarks`
- [x] Build frontend (pages mode)
- [x] Create Pages project `davidclarks-temp-email`
- [x] Deploy frontend to Pages
- [x] Confirm nameserver cutover for `davidclarks.xyz`
- [x] Enable Cloudflare Email Routing on `davidclarks.xyz`
- [x] Verify a destination mailbox in Email Routing
- [x] Route `Catch-all` mail to Worker `davidclarks-temp-email-api`
- [x] Fix: add `ENABLE_USER_CREATE_EMAIL = true` to wrangler config and redeploy
- [x] End-to-end verify mail delivery (tmptest@davidclarks.xyz address created successfully)
