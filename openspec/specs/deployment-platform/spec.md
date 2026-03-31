# Spec: Deployment platform

## Purpose

The project deployment for this workspace must remain resumable from repository state without depending on chat history.

## Requirements

### Requirement: Persistent deployment record

The repository MUST store the current deployment state in `openspec/`.

#### Scenario: Resume after interruption

- Given a later work session starts without prior chat context
- When the operator opens `openspec/changes/bootstrap-danielyoung-temp-email-deployment/`
- Then they can identify completed steps, pending steps, and required external configuration values

### Requirement: Current public endpoints

The repository MUST record the currently deployed Worker and Pages endpoints.

#### Scenario: Operator needs the active URLs

- Given the deployment record is present
- When the operator checks the design document
- Then they can find the active Worker URL and Pages URL

### Requirement: External zone handoff visibility

The repository MUST record whether domain DNS cutover and Email Routing are complete.

#### Scenario: Deployment is blocked on Cloudflare zone setup

- Given infrastructure deployment is finished but mail is not yet working
- When the operator checks the task list
- Then they can see that nameserver cutover and Email Routing are still pending
