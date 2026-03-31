# OpenSpec Workspace

This directory tracks the persistent deployment state for the local `cloudflare_temp_email` workspace.

## Conventions

- `openspec/specs/` stores the current long-lived truth.
- `openspec/changes/` stores in-progress changes and deployment work.
- Completed changes can later move to `openspec/changes/archive/`.

## Current Source Of Truth

- Current deployment topology: `openspec/specs/deployment-platform/current-state.md`
- Zero-to-one setup and pitfalls: `openspec/specs/deployment-platform/bootstrap-guide.md`
- Long-lived deployment rules: `openspec/specs/deployment-platform/spec.md`

## Archived Changes

- `openspec/changes/archive/bootstrap-danielyoung-temp-email-deployment/`
- `openspec/changes/archive/bootstrap-davidclarks-temp-email-deployment/`
- `openspec/changes/archive/bootstrap-adavidclark-temp-email-deployment/`
- `openspec/changes/archive/fix-danielyoung-anonymous-create-and-pages-api-base/`
