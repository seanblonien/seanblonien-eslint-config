// Import from source to avoid circular dependency during build
import baseConfig from './packages/eslint-config-base/src/index';
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
