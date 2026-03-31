# Proposal: Fix anonymous mailbox creation visibility and Pages API base

## Why

The production `danielyoung` deployment had two user-facing regressions:

- Anonymous users could not see the "Create New Email" entry.
- `https://mail.danielyoung.top` still called the old `workers.dev` API origin, causing browser CORS failures.

This fix needs to be archived so a later session can reconstruct both the runtime issue and the exact remediation path from repository state.

## Scope

- Record the Worker-side config required for anonymous mailbox creation
- Record the frontend API-base config required for the custom domains
- Record the deploy and verification chain used to repair production
- Record the final effective production checks

## Out of Scope

- Email Routing setup changes
- Outbound mail provider setup
- SMTP/IMAP proxy changes
