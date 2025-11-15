import type { Linter } from 'eslint';
// @ts-ignore - importing from root config outside package rootDir
import rootConfig from '../../eslint.config';

export default [
  ...rootConfig,
  {
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
] as Linter.Config[];
