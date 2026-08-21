# Fruits Discord Bot — Agent Instructions

This file is the repository-wide source of truth for AI coding agents.

## Project purpose

Fruits Discord Bot mediates between the Fruits gaming-guild website and its Discord server.

Initial product areas:

1. Discord commands and notifications.
2. Website -> Discord notifications.
3. Discord -> website updates through an authenticated API.
4. Raid-party management.
5. Giveaways.
6. Additional guild-management features later.

Do not assume undocumented website APIs exist. Introduce interfaces/adapters first and document any API contract that still needs to be implemented.

## Core stack

- Node.js >= 24.17
- TypeScript
- discord.js
- ES modules
- Vitest
- Biome
- Zod for runtime validation
- npm as the package manager

Do not replace the core stack without an explicit task requiring it.

## Architecture boundaries

Keep Discord, website integration, and domain logic separate.

Expected dependency direction:

`Discord/Web adapters -> application/services -> domain`

Infrastructure may implement domain/application interfaces, but domain code must not import Discord-specific or HTTP-specific modules.

Preferred folders:

- `src/discord/` — Discord client, events, commands, presentation.
- `src/domain/` — business rules and domain types.
- `src/services/` — application workflows/use cases.
- `src/integrations/website/` — Fruits website API client and webhook handling.
- `src/config/` — configuration and environment validation.
- `src/shared/` — narrowly reusable helpers.
- `tests/` — cross-cutting/integration tests when colocated tests are not appropriate.

Do not put business logic directly inside Discord event handlers or command handlers.

## Security rules

This repository is public.

NEVER commit:

- Discord bot tokens
- webhook secrets
- API keys
- production URLs containing credentials
- user session cookies
- private guild/member data dumps
- `.env`
- credentials copied into fixtures, logs, tests, docs, or examples

Use `.env.example` with fake/example values only.

Validate untrusted website/webhook input before use.

Never log secrets.

Any website -> Discord webhook must eventually use authenticated requests (for example HMAC signatures, a shared secret, or another explicit authentication design). Do not expose an unauthenticated state-changing endpoint.

## Agent operating rules

Before making changes:

1. Read this `AGENTS.md`.
2. Read the issue/task completely.
3. Inspect relevant existing code and tests.
4. State the smallest reasonable scope internally before editing.
5. Avoid unrelated refactors.

While working:

- Keep changes focused.
- Follow existing patterns.
- Prefer explicit types at system boundaries.
- Validate external input.
- Add or update tests for behavior changes.
- Do not silently change public API contracts.
- Do not delete tests merely to make CI pass.
- Do not weaken type checking, linting, or security checks merely to make CI pass.
- Do not add dependencies unless they provide clear value.
- Do not modify generated lockfiles by hand.

Before declaring work complete, run:

```bash
npm run check
npm run typecheck
npm test
npm run build
```

If a command cannot be run, say exactly why.

## Git rules

Agents may:

- create feature branches
- edit source/test/docs files within task scope
- commit changes
- push their own branches
- open pull requests
- respond to review feedback

Agents must NOT:

- push directly to `main`
- force-push shared branches unless explicitly authorized
- merge a pull request
- bypass branch protection
- rewrite unrelated history
- commit secrets

Branch naming:

- `feat/<issue>-short-name`
- `fix/<issue>-short-name`
- `test/<issue>-short-name`
- `docs/<issue>-short-name`
- `chore/<issue>-short-name`

If there is no issue number, omit it.

## Pull-request definition of done

A PR is ready for human merge consideration only when:

- task acceptance criteria are satisfied
- new behavior has tests where practical
- `npm run check` passes
- `npm run typecheck` passes
- `npm test` passes
- `npm run build` passes
- no unresolved blocking reviewer comments remain
- no secrets are included
- the PR description explains the change and testing performed

Human approval is required for merge.

## Agent roles

Role-specific prompts live in `agents/`.

- Supervisor: decomposes and coordinates; normally does not code.
- Worker: implements one scoped task.
- Tester: independently attempts to break/verify the implementation.
- Reviewer: performs code review and returns APPROVE or REQUEST_CHANGES.
- PR Tracker: tracks PR/CI/review state and creates follow-up work descriptions.

Role documents supplement this file. They do not override repository-wide security or Git rules.

## Escalate to a human when

- credentials or production secrets are required
- a database migration could destroy data
- a change affects authentication/authorization semantics in an unclear way
- the website API contract is ambiguous
- two tasks require conflicting architecture
- a requested change would weaken security or branch protection
- product behavior cannot be inferred from the issue or existing code
