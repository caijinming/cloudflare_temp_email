# Tasks: Fix anonymous mailbox creation visibility and Pages API base

- [x] Inspect frontend conditions that hide the "Create New Email" entry
- [x] Inspect Worker settings output used by the homepage
- [x] Set `DISABLE_ANONYMOUS_USER_CREATE_EMAIL = false` explicitly in `worker/wrangler.toml`
- [x] Dry-run the Worker deploy and confirm the effective env payload includes the explicit anonymous-create flag
- [x] Deploy Worker `danielyoung-temp-email-api`
- [x] Verify `GET https://api.danielyoung.top/open_api/settings`
- [x] Confirm `enableUserCreateEmail = true`
- [x] Confirm `disableAnonymousUserCreateEmail = false`
- [x] Inspect frontend env files and live production symptom
- [x] Align local frontend API-base config with `https://api.danielyoung.top`
- [x] Add `mobile-web-app-capable` meta tag to `frontend/index.html`
- [x] Rebuild frontend production assets
- [x] Deploy Pages project `danielyoung-temp-email`
- [x] Verify `https://mail.danielyoung.top` serves the updated HTML
- [x] Verify the live JS bundle references `https://api.danielyoung.top`
- [x] Verify the live JS bundle no longer references the old `workers.dev` URL
