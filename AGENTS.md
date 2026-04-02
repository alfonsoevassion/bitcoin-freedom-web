\
# Agent Guidelines for bitcoin-freedom-web\n\
\n\
This document outlines the guidelines and conventions for agents operating within the `bitcoin-freedom-web` repository. Adhering to these guidelines ensures consistency, maintainability, and efficiency.\n\
\n\
## 1. Build, Lint, and Test Commands\n\
\n\
The following commands are available for managing the project's lifecycle:\n\
\n\
### Build\n\
- Command: `npm run build`\n\
- Description: Compiles the project's TypeScript code and bundles it for production using Vite. This command is essential for creating deployable artifacts.\n\
  - Runs `tsc -b` for TypeScript compilation.\n\
  - Runs `vite build` for Vite's build process.\n\
\n\
### Lint\n\
- Command: `npm run lint`\n\
- Description: Analyzes the codebase for stylistic and programmatic errors using ESLint. This helps maintain code quality and consistency.\n\
  - Runs `eslint .` to lint all files in the current directory and its subdirectories.\n\
\n\
### Test\n\
- **Single Test Execution**: \n\
  - Currently, there is no explicit script in `package.json` for running individual tests.\n\
  - If a test runner (e.g., Vitest, Jest) were configured, typical commands might look like:\n\
    - `npx vitest `tests/my.test.ts` (for Vitest)\n\
    - `npm test -- tests/my.test.ts` (if configured in package.json scripts)\n\
- **General Test Execution**: \n\
  - There is no dedicated `npm test` script defined in `package.json`.\n\
  - To run all tests, you would typically execute the test runner's command directly (e.g., `npx vitest` or `npx jest`).\n\
  - **Note**: The project's test setup needs to be confirmed or configured for robust testing workflows.\n\
\n\
## 2. Code Style Guidelines\n\
\n\
Agents should strictly adhere to the following coding standards:\n\
\n\
### Imports\n\
- **Order**: Imports should be grouped and ordered as follows:\n\
  1. Built-in Node.js modules (if applicable).\n\
  2. Third-party library imports.\n\
  3. Local application/component imports.\n\
- **Style**: Use ES module syntax (`import ... from '...'`).\n\
- **Specificity**: Avoid wildcard imports (`import * as ...`) unless necessary. Import only the specific modules or functions required.\n\
\n\
### Formatting\n\
- **Indentation**: Use 2 spaces for indentation (consistent with Vite and React best practices).\n\
- **Line Length**: Aim for a line length of 80-100 characters to maintain readability.\n\
- **Spacing**: Use consistent spacing around operators, after commas, and within control structures.\n\
- **Quotes**: Prefer single quotes (`'`) for strings unless a double quote is required by the content.\n\
\n\
### Types\n\
- **TypeScript**: The project uses TypeScript. All code should be type-annotated.\n\
- **Strictness**: Enable strict type-checking options in `tsconfig.json` (if available) or assume strictness is desired.\n\
- **Interfaces/Types**: Define clear interfaces or types for complex data structures, component props, and API responses.\n\
- **Readability**: Type annotations should enhance, not obscure, code readability.\n\
\n\
### Naming Conventions\n\
- **Variables & Functions**: Use camelCase (e.g., `myVariableName`, `calculateTotal`).\n\
- **Constants**: Use SCREAMING_SNAKE_CASE for global constants (e.g., `MAX_RETRIES`).\n\
- **Classes & Components**: Use PascalCase (e.g., `UserProfile`, `ButtonComponent`).\n\
- **Booleans**: Prefix boolean variables with `is`, `has`, or `should` (e.g., `isActive`, `hasPermission`).\n\
- **File Names**: Use kebab-case for file names (e.g., `user-profile.tsx`, `api-client.ts`).\n\
\n\
### Error Handling\n\
- **Exceptions**: Use `try...catch` blocks for asynchronous operations or operations that may throw errors.\n\
- **Error Objects**: Throw meaningful error objects, often extending the built-in `Error` class.\n\
- **API Errors**: Handle API errors gracefully, providing feedback to the user or logging appropriately.\n\
- **Linting**: Ensure ESLint is configured to catch common error patterns.\n\
\n\
### React Component Guidelines\n\
- **Function Components**: Prefer functional components with Hooks over class components.\n\
- **Props**: Use TypeScript interfaces or types for props. Destructure props for easier access.\n\
- **State Management**: Utilize React's built-in state management (useState, useReducer) or context API for local/shared state. For complex global state, consider dedicated libraries if they are added to the project.\n\
- **Hooks**: Follow the Rules of Hooks.\n\
\n\
## 3. Cursor and Copilot Rules\n\
\n\
- **Cursor Rules**: No specific Cursor rules were found in `.cursor/rules/`.\n\
- **Copilot Instructions**: No specific Copilot instructions were found in `.github/copilot-instructions.md`.\n\
- **Default Behavior**: In the absence of specific rules, agents should default to best practices for code quality, security, and maintainability as outlined in this document.\n\
\n\
## 4. General Notes\n\
\n\
- **Readability**: Prioritize clear, concise, and readable code.\n\
- **Maintainability**: Write code that is easy to understand, modify, and extend.\n\
- **Security**: Be mindful of security implications, especially when handling user input or external data.\n\
- **Performance**: Write efficient code, but avoid premature optimization. Profile and optimize where necessary.\n\
- **Modularity**: Keep code modular and focused on single responsibilities.\n\
