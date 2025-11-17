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
      // Override rules from the base config as needed
      'no-loops/no-loops': 'off', // Allow loops in this project
      '@typescript-eslint/no-magic-numbers': 'off', // Allow magic numbers
    },
  },
  {
    ignores: ['dist/**', 'build/**'],
  },
];
```

## What's Included

This base config builds on top of the following direct dependencies:

- **[@eslint/js](https://www.npmjs.com/package/@eslint/js)** - ESLint's recommended JavaScript rules
- **[typescript-eslint](https://www.npmjs.com/package/typescript-eslint)** - TypeScript linting without project-aware rules for faster performance
- **[@stylistic/eslint-plugin](https://www.npmjs.com/package/@stylistic/eslint-plugin)** - Code style and formatting rules
- **[eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x)** - Import/export validation and organization
- **[eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)** - TypeScript import resolution for import-x
- **[eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)** - Detects and removes unused imports
- **[eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)** - Modern JavaScript/TypeScript best practices
- **[eslint-plugin-sonarjs](https://www.npmjs.com/package/eslint-plugin-sonarjs)** - Code quality and bug detection rules
- **[@eslint-community/eslint-plugin-eslint-comments](https://www.npmjs.com/package/@eslint-community/eslint-plugin-eslint-comments)** - Best practices for ESLint directive comments
- **[eslint-plugin-ban](https://www.npmjs.com/package/eslint-plugin-ban)** - Ban specific imports or code patterns
- **[eslint-plugin-no-loops](https://www.npmjs.com/package/eslint-plugin-no-loops)** - Encourages functional programming patterns
- **[eslint-plugin-sort](https://www.npmjs.com/package/eslint-plugin-sort)** - Automatic sorting of imports, exports, and more
- **[eslint-plugin-testing-library](https://www.npmjs.com/package/eslint-plugin-testing-library)** - Best practices for Testing Library
- **[globals](https://www.npmjs.com/package/globals)** - Global variable definitions for different environments

## Requirements

- Node.js >= 20
- ESLint >= 9.0.0
- TypeScript >= 5.0.0

## License

MIT © Sean Blonien
