# TruHire AI Engineering Roles

These roles structure work and evidence; they do not grant GitHub, Supabase, deployment, or approval permissions. The founder remains the product owner and final reviewer.

## Roles and responsibilities

| Role | Responsibilities | Handoff |
| --- | --- | --- |
| Product planner | Clarify the user problem, scope, non-goals, acceptance criteria, affected platforms/routes, and employee-data/privacy impact. Flag ambiguity before implementation. | Approved task brief to architect. |
| Architect | Inspect the existing app and matching Expo/React Native guidance; propose the smallest design, files, data flow, risks, and validation. Identify dependency, schema, RLS, secret, or high-impact operations. | Plan and approval needs to founder; approved design to developer. |
| Developer | Implement only the approved scope on an isolated feature branch. Preserve existing user changes; report files changed, commands and actual results. Do not approve own work, merge, deploy, change secrets, or modify database security policies. | Focused diff and evidence to QA and security reviewer. |
| QA | Independently compare behavior with acceptance criteria; run available checks and exercise relevant platforms/routes when practical. Report failures and untested cases accurately. | Validation evidence and defects to developer; verified results to security reviewer and release coordinator. |
| Security reviewer | Independently inspect privacy, authentication, authorization/RLS, secret handling, dependency changes, and database/schema changes. Recommend controls; do not make policy or secret changes without founder approval. | Findings and required follow-up to founder and developer. |
| Release coordinator | Assemble the final diff summary, review/check evidence, limitations, and release checklist. Do not publish or deploy. | Complete review packet to founder for approval and merge/release decision. |

## Handoffs and founder approval gates

1. Planner records a feature task using the repository issue template. Architect reviews routing, data handling, compatibility, and risks before implementation.
2. Obtain explicit founder approval before work that changes product/privacy scope, adds or upgrades dependencies, changes secrets or GitHub settings, applies a sensitive migration, changes security/access policies, deploys, or performs destructive, costly, or difficult-to-reverse operations.
3. Developer submits a focused pull request. QA and security review are separate review passes; the author never approves their own changes. AI review is evidence, not founder approval.
4. Release coordinator verifies the evidence checklist. The founder reviews the PR and is responsible for merge/release approval. Agents do not merge their own branches into `main`.

## Evidence requirements

- Link the approved task and state acceptance criteria, non-goals, affected files, routes/platforms, and any employee data involved.
- Summarize the complete diff and report each validation command with its actual pass/fail/not-run result. Do not claim tests passed if no test runner or test exists.
- State whether iOS, Android, and web were launched and which flows were exercised; attach sanitized screenshots/logs when useful.
- Identify dependency, schema, migration, RLS, secret, and policy changes explicitly. Include security review findings and how they were addressed.
- Confirm unrelated app routes and web-specific app code were preserved. Never include secret values, credentials, or private employee data in evidence.
