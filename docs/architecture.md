# Architecture

## Goal

Keep Discord-specific code, website-specific code, and Fruits guild business rules independently testable.

## Layers

```text
Discord interactions/events        Website API/webhooks
          |                               |
          v                               v
   Discord adapters                Website adapters
          \                               /
           \                             /
            v                           v
             Application / Services
                      |
                      v
                    Domain
```

## Folders

```text
src/
  config/
  discord/
    commands/
    events/
  domain/
  services/
  integrations/
    website/
  shared/
```

## Dependency rules

- `domain` must not import `discord.js`.
- `domain` must not make HTTP requests.
- `services` coordinate use cases and depend on interfaces.
- `discord` converts Discord interactions/events into service calls.
- `integrations/website` owns Fruits website HTTP/webhook specifics.
- External payloads are validated at the boundary.

## Website integration

Do not let commands scatter arbitrary fetch calls throughout the codebase.

Use an interface such as:

```ts
export interface FruitsWebsiteClient {
  updateMember(...): Promise<...>;
  publishRaid(...): Promise<...>;
}
```

and keep its HTTP implementation in `src/integrations/website/`.

For website -> Discord events, define explicit event schemas and authenticated webhook handling. Replayed requests should be considered when implementing state-changing behavior.

## Persistence

Raid parties and giveaways will require persistence. Do not select a database implicitly inside a feature PR.

Recommended direction when persistence is introduced:

- PostgreSQL for production
- a typed migration/query layer
- repository interfaces so domain logic remains testable

The database decision should be an explicit architecture issue/PR.

## Discord design

Prefer slash commands and Discord-native interactions.

Handlers should:

1. validate/normalize Discord input
2. check relevant permissions
3. call a service/use case
4. translate the result into a Discord response

Handlers should not contain substantial raid/giveaway rules.

## Error handling

External failures should be categorized rather than swallowed.

Examples:

- validation error
- permission error
- website unavailable
- website rejected request
- Discord API failure
- internal error

Do not expose stack traces or secrets to Discord users.
