# Development

## Requirements

- Node.js >= 24.17
- npm

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Quality gate

Before opening a PR:

```bash
npm run check
npm run typecheck
npm test
npm run build
```

## Branches

Examples:

```text
feat/12-raid-create-command
fix/27-duplicate-webhook-notification
test/31-giveaway-race-cases
docs/website-api-contract
```

## Environment

`.env` is local-only and gitignored.

`.env.example` documents required names using safe placeholders.

## GitHub

Recommended branch rules for `main`:

- require a pull request
- require CI status check
- block force pushes
- block branch deletion
- require conversation resolution
- keep human merge authority

Once the team/workflow matures, consider requiring at least one human approval as well.
