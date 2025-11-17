# Contributing to seanblonien-eslint-config

This document provides guidelines for developing and contributing to this monorepo.

## Development Setup

This is a Turborepo monorepo managed with pnpm.

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### Installation

```sh
# Install dependencies
pnpm install
```

### Available Commands

```sh
# Build all packages
pnpm -w build

# Lint all packages
pnpm -w lint

# Test all packages
pnpm -w test

# Run all validation (lint + build + test)
pnpm -w validate

# Clean build artifacts
pnpm -w clean

# Publish to npm (uses semantic-release)
pnpm release
```

## Versioning & Releases

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) with [multi-semantic-release](https://github.com/dhoulb/multi-semantic-release) for automated versioning and publishing.

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features (triggers minor version bump)
- `fix:` - Bug fixes (triggers patch version bump)
- `docs:` - Documentation changes (triggers patch version bump)
- `test:` - Test changes (no release)
- `ci:` - CI configuration changes (no release)
- `chore:` - Other changes (no release)

**Breaking changes:** Add `!` after the type or include `BREAKING CHANGE:` in the commit footer to trigger a major version bump.

Examples:
```sh
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

## Project Structure

```
seanblonien-eslint-config/
├── packages/
│   ├── eslint-config-base/     # Base TypeScript/JavaScript config
│   └── eslint-config-react/    # React config (extends base)
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI pipeline
│       └── publish.yml         # Automated publishing
├── turbo.json                  # Turborepo configuration
└── pnpm-workspace.yaml         # pnpm workspace configuration
```

## Making Changes

1. Create a new branch from `main`
2. Make your changes following the commit message format
3. Run `pnpm -w validate` to ensure all checks pass
4. Submit a pull request

## Questions?

Feel free to open an issue for any questions or concerns.
