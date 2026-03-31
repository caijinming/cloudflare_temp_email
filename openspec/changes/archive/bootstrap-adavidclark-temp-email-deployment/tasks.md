# Tasks: Bootstrap adavidclark.xyz temp mail deployment

- [x] Create D1 database `adavidclark-temp-email`
- [x] Apply `db/schema.sql` to D1
- [x] Create `worker/wrangler.adavidclark.toml`
- [x] Deploy Worker `adavidclark-temp-email-api`
- [x] Create `frontend/.env.adavidclark`
- [x] Build frontend (pages mode)
- [x] Create Pages project `adavidclark-temp-email`
- [x] Deploy frontend to Pages
- [x] Confirm nameserver cutover for `adavidclark.xyz`
- [x] Enable Cloudflare Email Routing on `adavidclark.xyz`
- [x] Verify a destination mailbox in Email Routing
- [x] Route `Catch-all` mail to Worker `adavidclark-temp-email-api`
- [x] Fix: add `ENABLE_USER_CREATE_EMAIL = true` to wrangler config and redeploy
- [x] End-to-end verify mail delivery (tmptest@adavidclark.xyz address created successfully)
