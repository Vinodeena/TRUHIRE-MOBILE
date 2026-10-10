## Summary and task

Describe the behavior changed and link the approved issue/task.

## Changed files

List the exact files changed and why each is in scope.

## Acceptance criteria

- [ ] Criteria from the task are met.
- [ ] Loading, error, and empty states are covered where applicable.

## Validation evidence

| Command or check | Result (pass / fail / not run) | Notes |
| --- | --- | --- |
| `npm run lint` | | |
| `npx tsc --noEmit` | | |
| Relevant automated tests (name command) | | |

Do not report tests that do not exist or checks that were not completed.

## Runtime coverage

- iOS (device/simulator and flow):
- Android (device/emulator and flow):
- Web (browser and flow):
- Screenshots/logs attached, sanitized of secrets and personal data:
- Untested platforms/flows and reason:

## Privacy and security review

- [ ] Employee data collected, displayed, stored, and shared is limited to the approved purpose.
- [ ] No public ratings, reputation scores, rankings, or employee scoring are added.
- [ ] Authentication/authorization and RLS behavior were reviewed.
- [ ] No credentials, service-role keys, tokens, or secret values appear in the diff or evidence.
- Security findings and disposition:

## Dependencies and database/schema

- Dependencies changed (or “none”):
- Schema/migration/RLS/policy changes (or “none”):
- Founder approval required/received for high-impact changes:
- Confirm no production migration or deployment was run:

## Scope and review

- [ ] Existing Home, My Profile, Work History, Settings, and other affected route destinations are preserved.
- [ ] Separate web project is untouched; Expo web-specific code is preserved.
- [ ] Complete diff and working tree were reviewed for unrelated, generated, or secret-bearing changes.
- [ ] Required independent QA/security review is recorded; author has not approved their own change.
