# Project Guidelines

## Overview

Mismerge is a web-based merge editor built with **Svelte 5**. It provides one-way (`MisMerge2`) and two-way (`MisMerge3`) merge components with framework adapters for React and Solid.

## Repository Structure

This is an **npm workspaces** monorepo:

| Workspace       | Path                      | Description                                                    |
| --------------- | ------------------------- | -------------------------------------------------------------- |
| `@vostej/core`  | `packages/core/`          | Core Svelte library — components, diff logic, editor internals |
| `@vostej/react` | `packages/adapter-react/` | React wrapper (depends on core)                                |
| `@vostej/solid` | `packages/adapter-solid/` | Solid wrapper (depends on core)                                |
| `demo`          | `demo/`                   | SvelteKit demo app (depends on core)                           |

The core package must be built before adapters or demo can type-check. Adapters and demo import from `@vostej/core` via its `dist/` output.

## Build and Run

```sh
# Install all workspace dependencies from the repo root
npm install

# Build core (required before check/build of adapters or demo)
cd packages/core && npm run package

# Build everything (all workspaces)
npm run build

# Run core dev server
npm run core

# Run demo dev server (starts core watch + vite concurrently)
npm run demo
```

## Testing and Checks

```sh
# Type-check all workspaces (core must be packaged first)
npm run check

# Run tests (vitest in core)
npm run test

# Lint (Prettier + ESLint across the whole repo)
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format only (Prettier)
npm run format
```

## Code Style

- **Formatting:** Prettier with tabs, single quotes, no trailing commas, 100 char print width.
- **Linting:** ESLint 8 with `@typescript-eslint` and `eslint-plugin-svelte`. Config in `.eslintrc.cjs`.
- Prefix unused variables with `_` (enforced by ESLint).
- Svelte files use `svelte-eslint-parser` with `@typescript-eslint/parser`.

## Conventions

- All packages use `"type": "module"` (ESM).
- Core exports Svelte components via `@sveltejs/package` and a vanilla JS bundle via Rollup (`dist/web.js`).
- Core CSS themes are exported as separate entry points: `@vostej/core/styles.css`, `@vostej/core/light.css`, `@vostej/core/dark.css`.
- Packages publish to **GitHub Packages** under the `@vostej` scope using `semantic-release-monorepo`.
