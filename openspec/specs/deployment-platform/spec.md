# Spec: Deployment platform

## Purpose

The project deployment for this workspace must remain resumable from repository state without depending on chat history.

## Requirements

### Requirement: Persistent deployment record

The repository MUST store the current production deployment state in `openspec/specs/deployment-platform/`.

#### Scenario: Resume after interruption

- Given a later work session starts without prior chat context
- When the operator opens `openspec/specs/deployment-platform/current-state.md`
- Then they can identify the active production topology, current blockers, and the local config files that drive deployment

### Requirement: Current public endpoints

The repository MUST record the currently deployed Worker, Pages, and mailbox-domain topology.

#### Scenario: Operator needs the active URLs

- Given the deployment record is present
- When the operator checks `openspec/specs/deployment-platform/current-state.md`
- Then they can find the active API domain, the active Pages project, the site domain, and the mailbox domains served by the unified deployment

### Requirement: Archived deployment history

Completed one-off deployment changes MUST remain available under `openspec/changes/archive/`.

#### Scenario: Operator needs historical single-domain context

- Given the workspace previously used separate deployments for individual domains
- When the operator checks `openspec/changes/archive/`
- Then they can inspect the earlier `proposal.md`, `design.md`, and `tasks.md` files without confusing them with the current production topology

### Requirement: Unified production topology

The current production target MUST be documented as one site and one API serving three mailbox domains.

#### Scenario: Operator needs to know which deployment is primary

- Given multiple legacy domain-specific deployments still exist in the account
- When the operator checks `openspec/specs/deployment-platform/current-state.md`
- Then they can identify that the unified production topology is anchored on `danielyoung-temp-email-api` and `danielyoung-temp-email`, while `davidclarks` and `adavidclark` remain historical references

### Requirement: Zero-to-one bootstrap guide

The repository MUST include a reproducible from-scratch setup guide for the unified deployment.

#### Scenario: A future AI needs to rebuild the deployment

- Given a future AI starts from a fresh clone
- When it opens `openspec/specs/deployment-platform/bootstrap-guide.md`
- Then it can follow the ordered bootstrap steps, configure the required files, and verify the deployment without relying on prior chat context

### Requirement: Pitfall registry

The repository MUST document known deployment pitfalls and their mitigations.

#### Scenario: A future AI needs to avoid previously observed failures

- Given the operator encounters local build, domain, or mail-routing issues
- When they open `openspec/specs/deployment-platform/bootstrap-guide.md`
- Then they can find the known failure modes, including Node version contamination, Pages custom-domain CNAME requirements, Email Routing per-domain setup, and the frontend `domains.map` failure mode

### Requirement: Effective runtime config verification

The repository MUST require verification of the Worker's effective runtime config after deploy, not just the checked-in `wrangler.toml`.

#### Scenario: Checked-in config disagrees with production behavior

- Given the repository shows the expected Worker vars in `worker/wrangler.toml`
- And Cloudflare may retain older dashboard-side values because `keep_vars = true`
- When the operator verifies the deployment
- Then they must inspect the effective `GET /open_api/settings` response and confirm drift-sensitive fields such as `enableUserCreateEmail`, `disableAnonymousUserCreateEmail`, and `domains`

### Requirement: External zone handoff visibility

The repository MUST record whether DNS and Email Routing actions still require Cloudflare zone-level changes.

#### Scenario: Deployment is blocked on Cloudflare zone setup

- Given infrastructure deployment is finished but mail is not yet working
- When the operator checks `openspec/specs/deployment-platform/current-state.md`
- Then they can see which domain bindings are already active and which remaining steps still require DNS or Email Routing changes in the Cloudflare dashboard
