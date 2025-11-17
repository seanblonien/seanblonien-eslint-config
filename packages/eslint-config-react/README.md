# @seanblonien/eslint-config-react

![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-react)
![license](https://img.shields.io/npm/l/@seanblonien/eslint-config-react)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Sean Blonien's opinionated ESLint config for TypeScript & React projects. **This package extends [@seanblonien/eslint-config-base](https://github.com/seanblonien/seanblonien-eslint-config/tree/main/packages/eslint-config-base)** and includes all base TypeScript/JavaScript rules *plus* React-specific configurations.

## Installation

Since this uses eslint v9, the only peer dependency is `eslint` itself, all other dependencies are included in the package.

**Note:** This package automatically includes `@seanblonien/eslint-config-base` as a dependency, so you don't need to install it separately.

```sh
# pnpm
pnpm add -D eslint @seanblonien/eslint-config-react

# npm
npm install -D eslint @seanblonien/eslint-config-react

# yarn
yarn add -D eslint @seanblonien/eslint-config-react
```

## Usage

```ts
// eslint.config.ts
import reactConfig from '@seanblonien/eslint-config-react';

export default [
  ...reactConfig,
  {
    rules: {
      'react/jsx-curly-spacing': ['error', { when: 'always' }],
    },
  },
  {
    ignores: ['dist/**', 'build/**'],
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

## Requirements

- Node.js >= 20
- ESLint >= 9.0.0
- TypeScript >= 5.0.0
- React >= 16.8.0

## License

MIT © Sean Blonien
