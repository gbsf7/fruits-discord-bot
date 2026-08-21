# Recommended labels

Create these labels in GitHub:

- `agent-ready` — task is sufficiently scoped for a Worker
- `agent-working` — an agent is actively implementing it
- `needs-testing` — implementation needs independent Tester verification
- `needs-review` — implementation needs Reviewer review
- `needs-fix` — Tester/Reviewer found blocking work
- `blocked` — cannot proceed until another dependency/decision is resolved
- `human-review` — AI workflow is complete; owner should inspect/merge
- `needs-triage` — issue has not yet been planned
- `bug`
- `enhancement`
- `security`
- `documentation`

Suggested state flow:

`needs-triage -> agent-ready -> agent-working -> needs-testing -> needs-review -> human-review`
