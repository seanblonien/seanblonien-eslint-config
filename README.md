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

# Publish to npm (uses semantic-release)
pnpm release
```

## Versioning & Releases

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) with [multi-semantic-release](https://github.com/dhoulb/multi-semantic-release) for automated versioning and publishing.

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features (triggers minor version bump)
- `fix:` - Bug fixes (triggers patch version bump)
- `perf:` - Performance improvements (triggers patch version bump)
- `docs:` - Documentation changes (triggers patch version bump)
- `refactor:` - Code refactoring (triggers patch version bump)
- `test:` - Test changes (no release)
- `build:` - Build system changes (no release)
- `ci:` - CI configuration changes (no release)
- `chore:` - Other changes (no release)

**Breaking changes:** Add `!` after the type or include `BREAKING CHANGE:` in the commit footer to trigger a major version bump.

Examples:
```bash
feat: add new rule for import sorting
fix: correct TypeScript type definitions
feat!: remove deprecated configuration options
```

### Release Process

Releases are fully automated via GitHub Actions:

1. **Push to main** with conventional commits
2. **GitHub Actions** runs `multi-semantic-release`
3. **Versions are bumped** automatically based on commit types
4. **Changelogs are generated** for each package
5. **Packages are published** to npm
6. **Git tags are created** (e.g., `@seanblonien/eslint-config-base@1.2.3`)
7. **GitHub releases are created** with release notes

No manual versioning or changelog management required!

## License

MIT © Sean Blonien
