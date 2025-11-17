# seanblonien-eslint-config

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Monorepo for Sean Blonien's opinionated ESLint configurations for TypeScript & React projects.

## Features

- ✅ **ESLint 9+ Flat Config** - Modern configuration format
- 🎯 **TypeScript First** - Full TypeScript support with sensible defaults
- 🔧 **Composable** - Mix and match configs for your stack
- 📦 **ESM Only** - Modern JavaScript modules
- 🚀 **Zero Config** - Sensible defaults, customize as needed

## Packages

This monorepo contains two composable ESLint configuration packages:

| Package | Version | CI Status | Downloads | Description |
|---------|---------|-----------|-----------|-------------|
| [@seanblonien/eslint-config-base](./packages/eslint-config-base) | ![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-base) | [![CI](https://github.com/seanblonien/seanblonien-eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/seanblonien/seanblonien-eslint-config/actions/workflows/ci.yml) | ![npm downloads](https://img.shields.io/npm/dm/@seanblonien/eslint-config-base) | Base TypeScript/JavaScript rules |
| [@seanblonien/eslint-config-react](./packages/eslint-config-react) | ![npm](https://img.shields.io/npm/v/@seanblonien/eslint-config-react) | [![CI](https://github.com/seanblonien/seanblonien-eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/seanblonien/seanblonien-eslint-config/actions/workflows/ci.yml) | ![npm downloads](https://img.shields.io/npm/dm/@seanblonien/eslint-config-react) | **Extends base** + React + Hooks + a11y |

**Note:** The `@seanblonien/eslint-config-react` package extends and includes all of the base configurations and rules from the `@seanblonien/eslint-config-base` package. It does not duplicate the base config rules, so you only need to install one package based on your project type.

Click on the package names above to view detailed documentation for each package.

## Quick Start

### Installation

Choose the package that matches your project type:

```sh
# JavaScript/TypeScript Projects
npm install -D eslint @seanblonien/eslint-config-base

# React Projects (includes all base config rules)
npm install -D eslint @seanblonien/eslint-config-react
```

### Usage with Custom Rules

```ts
// eslint.config.ts
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

For more detailed usage examples and configuration options, see the individual package READMEs linked above.

## Contributing

The [Contributing Guide](./CONTRIBUTING.md) for development setup, workflow, and release process information.

## License

MIT © Sean Blonien
