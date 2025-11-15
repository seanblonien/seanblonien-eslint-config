# seanblonien-eslint-config

[![CI](https://github.com/seanblonien/seanblonien-eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/seanblonien/seanblonien-eslint-config/actions/workflows/ci.yml)

Composable ESLint flat configs for TypeScript and React projects.

## Features

- ✅ **ESLint 9+ Flat Config** - Modern configuration format
- 🎯 **TypeScript First** - Full TypeScript support with sensible defaults
- 🔧 **Composable** - Mix and match configs for your stack
- 📦 **ESM Only** - Modern JavaScript modules
- 🚀 **Zero Config** - Sensible defaults, customize as needed

## Packages

This monorepo contains two standalone, composable ESLint configuration packages:

| Package | Version | Description |
|---------|---------|-------------|
| [@seanblonien/eslint-config-base](./packages/eslint-config-base) | ![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-base) | Base TypeScript/JavaScript rules |
| [@seanblonien/eslint-config-react](./packages/eslint-config-react) | ![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-react) | React + Hooks + Web Accessibility |

## Installation

Choose the package that matches your project type:

```sh
# JavaScript/TypeScript Projects
pnpm add -D eslint @seanblonien/eslint-config-base

# React Projects
pnpm add -D eslint @seanblonien/eslint-config-react
```


## Usage Examples

### TypeScript Project

```js
// eslint.config.js
import baseConfig from '@seanblonien/eslint-config-base';

export default [...baseConfig];
```

### React Project

```js
// eslint.config.js
import reactConfig from '@seanblonien/eslint-config-react';

export default [...reactConfig];
```

### With Custom Rules

```js
// eslint.config.js
import reactConfig from '@seanblonien/eslint-config-react';

export default [
  ...reactConfig,
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

### Base Config
- ESLint recommended rules
- TypeScript support (no project-aware rules for speed)
- Import plugin with automatic sorting
- Unused variable detection with `_` prefix ignore

### React Config
- All base config rules
- React recommended rules
- React Hooks rules
- JSX Accessibility (a11y) rules
- Automatic React version detection

## Development

This is a Turborepo monorepo managed with pnpm.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm -w build

# Lint all packages
pnpm -w lint

# Test all packages
pnpm -w test

# Create a changeset
pnpm changeset

# Version packages
pnpm version-packages

# Publish to npm
pnpm release
```

## License

MIT © Sean Blonien
