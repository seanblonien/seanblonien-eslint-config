// @ts-expect-error - no types available
import baseConfig from '@seanblonien/eslint-config-base';
import type { Linter } from 'eslint';

export default [
  ...baseConfig,
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
    }
  }
] as Linter.Config[];
