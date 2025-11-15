# @seanblonien/eslint-config-react

ESLint flat config for React projects, extending the base config.

## Installation

```bash
pnpm add -D eslint @seanblonien/eslint-config-react
```

You'll also need to install the peer dependencies:

```bash
pnpm add -D @seanblonien/eslint-config-base eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

## Usage

Create an `eslint.config.js` file in your project root:

```javascript
import reactConfig from '@seanblonien/eslint-config-react';

export default [...reactConfig];
```

Or with TypeScript (`eslint.config.ts`):

```typescript
import reactConfig from '@seanblonien/eslint-config-react';

export default [...reactConfig];
```

## What's Included

This config extends `@seanblonien/eslint-config-base` and adds:

- `eslint-plugin-react` with recommended rules
- `eslint-plugin-react-hooks` for React Hooks rules
- `eslint-plugin-jsx-a11y` for accessibility rules
- Automatic React version detection

## License

MIT © Sean Blonien
