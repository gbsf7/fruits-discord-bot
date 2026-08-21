# Fruits Discord Bot

> Working project name. Final branding can be changed later.

A Discord bot that mediates between the Fruits gaming-guild website and its Discord server.

Planned capabilities include:

- website -> Discord notifications
- Discord -> website updates
- raid-party management
- giveaways
- guild-management utilities
- future integrations

## Stack

- Node.js 24.17+
- TypeScript
- discord.js
- Vitest
- Biome
- Zod

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
npm run dev
```

Fill in your development Discord credentials in `.env`. Never commit `.env`.

## Commands

```bash
npm run dev
npm run check
npm run format
npm run typecheck
npm test
npm run build
npm start
```

## Agent workflow

Repository-wide agent rules are in [`AGENTS.md`](./AGENTS.md).

Role prompts:

- [`agents/supervisor.md`](./agents/supervisor.md)
- [`agents/worker.md`](./agents/worker.md)
- [`agents/tester.md`](./agents/tester.md)
- [`agents/reviewer.md`](./agents/reviewer.md)
- [`agents/pr-tracker.md`](./agents/pr-tracker.md)

Agents may create branches, commit, push, and open PRs, but merging to `main` is reserved for a human.

## Architecture

See [`docs/architecture.md`](./docs/architecture.md).

The key rule is that Discord handlers and website adapters should be thin. Business behavior belongs in domain/application services so it can be tested without connecting to Discord.

## Initial milestones

1. Bot skeleton + `/ping`.
2. Website API contract and authenticated integration.
3. Website -> Discord notification pipeline.
4. Raid-party domain and commands.
5. Giveaway domain and commands.
6. Administration/configuration features.

## License

Choose a license before making the public repository broadly available. MIT is a common option for an open-source bot, but the project owner should decide.
