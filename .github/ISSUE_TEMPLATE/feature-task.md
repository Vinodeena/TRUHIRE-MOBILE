---
name: Feature task
about: Define a reviewable TruHire change before implementation
title: ""
labels: []
assignees: []
---

## User problem and intended outcome

Describe who needs what and why.

## Scope

- In scope:
- Out of scope:

## Non-goals

List related work that must not be included.

## Acceptance criteria

- [ ] Observable result:
- [ ] Error/loading/empty states:
- [ ] Accessibility and mobile behavior:

## Platforms and routes

- Platforms: iOS / Android / web (select all that apply)
- Existing Expo Router routes/screens affected:
- Confirm the separate web project is out of scope; preserve web-specific code in this Expo app.

## Employee-data privacy

- Employee data involved (or “none”):
- Purpose and minimum fields needed:
- Consent, visibility, retention, or sharing impact:
- Confirm no public employee ratings, reputation scores, rankings, or scoring are introduced.

## Database, schema, and RLS impact

- Tables, columns, queries, migrations, or policies affected (or “none”):
- Expected authenticated-user scope and RLS behavior:
- Local/test evidence required; confirm no production migration is part of this task:

## Approvals

- Founder/product approval required? Why?
- Dependency, secret, GitHub setting, security-policy, migration, deployment, or destructive/costly operation? Describe the proposed action and approval status before it is performed.

## Validation plan

- Commands available in `package.json`:
- Automated tests that exist and apply:
- Runtime/device/browser flows to exercise:
- Known limitations or checks that cannot be run:
