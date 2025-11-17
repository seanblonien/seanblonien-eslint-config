# @seanblonien/eslint-config-base

![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-base)
![license](https://img.shields.io/npm/l/@seanblonien/eslint-config-base)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Sean Blonien's opinionated ESLint config for TypeScript projects

## Installation

Since this uses eslint v9, the only peer dependency is `eslint` itself, all other dependencies are included in the package.

```sh
# pnpm
pnpm add -D eslint @seanblonien/eslint-config-base

# npm
npm install -D eslint @seanblonien/eslint-config-base

# yarn
yarn add -D eslint @seanblonien/eslint-config-base
```

## Usage

```ts
// eslint.config.ts
import baseConfig from '@seanblonien/eslint-config-base';

export default [
  ...baseConfig,
  {
    rules: {
      'no-console': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'build/**'],
  },
];
```

## What's Included

- **ESLint recommended rules** - Core ESLint best practices
- **TypeScript support** - Full TypeScript linting without project-aware rules for faster performance
- **Import plugin** - Automatic import sorting and organization
- **Unused variable detection** - Catches unused variables while allowing `_` prefix for intentionally unused variables

## Requirements

- Node.js >= 20
- ESLint >= 9.0.0
- TypeScript >= 5.0.0

## License

MIT © Sean Blonien
