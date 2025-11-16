# @seanblonien/eslint-config-react

![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-react)
![license](https://img.shields.io/npm/l/@seanblonien/eslint-config-react)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Sean Blonien's opinionated ESLint config for TypeScript & React projects. **This package extends [@seanblonien/eslint-config-base](../eslint-config-base)** and includes all base TypeScript/JavaScript rules plus React-specific configurations.

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

This config extends [@seanblonien/eslint-config-base](../eslint-config-base) and adds:

- **React plugin** - React recommended rules with opinionated defaults
- **React Hooks** - Rules for Hooks with additional best practices from react-hooks-addons
- **JSX Accessibility** - Comprehensive a11y rules for accessible React applications
- **React Compiler** - Support for the experimental React Compiler
- **Automatic version detection** - No need to manually specify React version

## Requirements

- Node.js >= 20
- ESLint >= 9.0.0
- TypeScript >= 5.0.0
- React >= 16.8.0

## License

MIT © Sean Blonien
