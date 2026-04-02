# Agent Guidelines for bitcoin-freedom-web

This document outlines guidelines and conventions for agentic coding agents operating in this repository.

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 8
- **Key Libraries:** react-globe.gl, Three.js
- **Linting:** ESLint (flat config) with typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh

## Build, Lint, and Test Commands

### Development
```bash
npm run dev        # Start Vite dev server
npm run preview    # Preview production build locally
```

### Build
```bash
npm run build      # Full production build (tsc -b && vite build)
```

### Lint
```bash
npm run lint       # Run ESLint on entire codebase
```

### Test
No test framework is currently configured. There are no test files or test scripts in `package.json`. If adding tests, use **Vitest** (recommended for Vite projects):

```bash
# After installing Vitest:
npx vitest                    # Run all tests
npx vitest path/to/test.ts    # Run a single test file
npx vitest --ui               # Run with UI
```

## Code Style Guidelines

### Imports
- Group imports in this order:
  1. Node.js built-in modules
  2. Third-party library imports
  3. Local application/component imports (use `@/` or relative paths)
- Use ES module syntax: `import { X } from '...'`
- Avoid wildcard imports (`import * as`) unless necessary
- Do not leave unused imports (enforced by `noUnusedLocals`)

### Formatting
- **Indentation:** 2 spaces
- **Line length:** 80-100 characters
- **Quotes:** Single quotes for strings
- **Semicolons:** Follow ESLint defaults
- **Trailing commas:** Follow ESLint defaults

### TypeScript
- **Strict mode is enabled** — do not use `any`
- Define interfaces/types for component props, API responses, and complex data
- Use `interface` for object shapes that may be extended, `type` for unions/intersections
- Prefer explicit return types for exported functions
- Use `as` casts sparingly; prefer type guards

### Naming Conventions
- **Variables & functions:** camelCase (`calculateTotal`, `isActive`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- **Components & types:** PascalCase (`UserProfile`, `CountryInfo`)
- **Booleans:** Prefix with `is`, `has`, `should`, `can`
- **Files:** PascalCase for React components (`GlobeComponent.tsx`), camelCase for utilities (`bitcoinService.ts`)

### Error Handling
- Use `try...catch` for async operations
- Throw meaningful `Error` objects with descriptive messages
- Handle API errors gracefully with user feedback
- Never swallow errors silently — log or rethrow

### React Component Guidelines
- Use functional components with hooks (no class components)
- Destructure props; define prop types with interfaces
- Follow Rules of Hooks strictly
- Use `useState`/`useReducer` for local state, Context API for shared state
- Keep components focused and modular

## Project Structure

```
src/
├── components/     # React components
├── services/       # Service layer (API calls, business logic)
├── assets/         # Static assets (images, etc.)
├── App.tsx         # Root component
├── main.tsx        # Entry point
└── *.json          # Data files (content, shapes, whitepaper)
```

## Cursor and Copilot Rules

No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` files exist. Follow this document's guidelines.

## General Notes

- Prioritize readability and maintainability over cleverness
- Avoid premature optimization; profile before optimizing
- Be mindful of security when handling external data
- Run `npm run lint` and `npm run build` before committing changes
