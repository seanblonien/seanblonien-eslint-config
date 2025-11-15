# @seanblonien/eslint-config-base

![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-base)
![license](https://img.shields.io/npm/l/@seanblonien/eslint-config-base)

Base ESLint flat config for modern JavaScript/TypeScript projects.

## Features

- ✅ ESLint recommended rules
- 🎯 TypeScript support (no project-aware rules for speed)
- 📦 Import plugin with automatic sorting and organization
- 🚫 Unused variable detection with `_` prefix ignore pattern
- ⚡ Fast - optimized for performance

## Installation

```bash
# pnpm
pnpm add -D eslint @seanblonien/eslint-config-base

# npm
npm install -D eslint @seanblonien/eslint-config-base

# yarn
yarn add -D eslint @seanblonien/eslint-config-base
```

## Peer Dependencies

This config requires the following peer dependencies (automatically installed):

- `eslint` >= 9.0.0
- `@eslint/js` >= 9.0.0
- `typescript-eslint` >= 8.0.0
- `eslint-plugin-import` >= 2.31.0
- `typescript` >= 5.0.0

## Usage

```js
// eslint.config.ts
import baseConfig from '@seanblonien/eslint-config-base';

export default [
  ...baseConfig,
  {
    rules: {
      // Rule overrides
    },
  },
];
```

## Requirements

- Node.js >= 20
- ESLint >= 9.0.0
- TypeScript >= 5.0.0

## License

MIT © Sean Blonien
