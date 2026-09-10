// Import from source to avoid circular dependency during build
import type { Linter } from 'eslint';
import baseConfig from './packages/eslint-config-base/src/index';

export default [
  ...baseConfig({ camelCase: true, consoleRestriction: true }),
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/.changeset/**',
    ],
  },
  {
    files: ['**/*.config.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
] as Linter.Config[];
