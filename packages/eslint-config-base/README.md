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

The default export is a factory function — call it (with or without options) rather than spreading it directly:

```ts
// eslint.config.ts
import eslintConfigBase from '@seanblonien/eslint-config-base';

export default [
  ...eslintConfigBase(),
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

> **Upgrading from v1?** The default export changed from a static config array to a factory
> function. Change `...baseConfig` to `...eslintConfigBase()` (or `...baseConfig()` if you kept
> the old import name). See [Configuration Options](#configuration-options) below for what's new.

## Configuration Options

`eslintConfigBase(options?)` accepts an optional `EslintConfigBaseOptions` object. Every option
defaults to whatever is least likely to misfire on real-world code — most notably, naming rules
that check *values* your code doesn't control (an external API's wire format, Node's own option
objects) are off by default, while the rule that checks names your code *does* choose stays on.

| Option | Default | What it does |
|---|---|---|
| `booleanNaming` | `true` | Require boolean variables/parameters/properties to carry an approved prefix (`is`, `has`, `should`, `does`, ...). Only ever inspects names, so it's safe to leave on everywhere. |
| `camelCase` | `false` | Require camelCase/UPPER_CASE identifiers and object/type properties (the core `camelcase` rule plus the matching half of `@typescript-eslint/naming-convention`). Off by default because any project decoding an external API's JSON, a Node `fs` options object, or a mocked payload in tests will otherwise get warnings on fields it's not allowed to rename. |
| `consoleRestriction` | `false` | Warn on `console.*` calls. Off by default since it's wrong for CLIs and scripts, where console output is the product — turn it on for libraries and long-running services. |

```ts
// A library/service with no external wire-format code can safely turn both back on:
export default [
  ...eslintConfigBase({ camelCase: true, consoleRestriction: true }),
];
```

If only *part* of a codebase touches external data (a client for a REST API, a set of test
fixtures), prefer leaving the relevant option off globally and adding a narrow, commented
`// eslint-disable-next-line @typescript-eslint/naming-convention -- <API> requires this exact
field name` at the specific call site instead of disabling the rule file-wide — that keeps the
check live for everything else in the file.

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
