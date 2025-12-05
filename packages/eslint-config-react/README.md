# @seanblonien/eslint-config-react

![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-react)
![license](https://img.shields.io/npm/l/@seanblonien/eslint-config-react)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Sean Blonien's opinionated ESLint config for TypeScript & React projects. **This package extends [@seanblonien/eslint-config-base](https://github.com/seanblonien/seanblonien-eslint-config/tree/main/packages/eslint-config-base)** and includes all base TypeScript/JavaScript rules *plus* React-specific configurations.

## Installation

This package provides two configurations: one for standard React projects and one for Next.js projects.

**Note:** This package automatically includes `@seanblonien/eslint-config-base` as a dependency, so you don't need to install it separately.
```sh
# pnpm
pnpm add -D eslint @seanblonien/eslint-config-react
pnpm add -D eslint @seanblonien/eslint-config-react @next/eslint-plugin-next # For Next.js projects only

# npm
npm install -D eslint @seanblonien/eslint-config-react
npm install -D eslint @seanblonien/eslint-config-react @next/eslint-plugin-next # For Next.js projects only

# yarn
yarn add -D eslint @seanblonien/eslint-config-react
yarn add -D eslint @seanblonien/eslint-config-react @next/eslint-plugin-next # For Next.js projects only
```

## Usage

### Standard React Projects

Use the default export for React projects without Next.js:

```ts
// eslint.config.ts
import reactConfig from '@seanblonien/eslint-config-react';

export default [
  ...reactConfig,
  {
    rules: {
      // Override rules as needed
    },
  },
  {
    ignores: ['dist/**', 'build/**'],
  },
];
```

### Next.js Projects

Use the `configWithNext` named export for Next.js projects (includes Next.js recommended rules and Core Web Vitals). This helper is **async**, so your `eslint.config.ts` must support top-level `await` (ESLint 9+ flat config):

```ts
// eslint.config.ts
import { configWithNext } from '@seanblonien/eslint-config-react';

export default [
	  ...(await configWithNext()),
	  {
	    rules: {
	      // Override rules as needed
	    },
	  },
	  {
	    ignores: ['dist/**', 'build/**', '.next/**'],
	  },
];
```

## What's Included

This config extends [@seanblonien/eslint-config-base](https://github.com/seanblonien/seanblonien-eslint-config/tree/main/packages/eslint-config-base) and builds on top of the following additional direct dependencies:

- **[@seanblonien/eslint-config-base](https://www.npmjs.com/package/@seanblonien/eslint-config-base)** - Base TypeScript/JavaScript ESLint configuration (includes all base rules and plugins)
- **[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)** - React-specific linting rules with automatic version detection
- **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** - Enforces Rules of Hooks and exhaustive dependencies
- **[eslint-plugin-react-hooks-addons](https://www.npmjs.com/package/eslint-plugin-react-hooks-addons)** - Additional best practices for React Hooks
- **[eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)** - Accessibility rules for JSX elements
- **[eslint-plugin-react-compiler](https://www.npmjs.com/package/eslint-plugin-react-compiler)** - Linting support for the experimental React Compiler

### Optional Next.js Support

When using the `configWithNext` export, the following additional plugin is required:

- **[@next/eslint-plugin-next](https://www.npmjs.com/package/@next/eslint-plugin-next)** - Next.js-specific linting rules including Core Web Vitals checks

**Important:** When using `configWithNext`, you must **not** also add `@next/eslint-plugin-next` / `@next/next` in your own ESLint config (for example in `plugins` or other shared configs). This config already registers the plugin, and ESLint will error if a plugin with the same key is loaded twice.

## Requirements

- Node.js >= 20
- ESLint >= 9.0.0
- TypeScript >= 5.0.0
- React >= 16.8.0

## License

MIT © Sean Blonien
