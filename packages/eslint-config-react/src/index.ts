/* eslint-disable @typescript-eslint/naming-convention -- config file */
import baseConfig from '@seanblonien/eslint-config-base';
// @ts-expect-error - no types available
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactHooksAddonsPlugin from 'eslint-plugin-react-hooks-addons';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  // Spread base config
  ...baseConfig,

  // React compiler and hooks addons
  reactCompilerPlugin.configs.recommended,
  reactHooksAddonsPlugin.configs.recommended,
  reactPlugin.configs.flat.recommended,
  (reactHooks.configs as unknown as { flat: { recommended: Linter.Config } }
  ).flat.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- incorrect type definition from package
  jsxA11y.flatConfigs.recommended as Linter.Config,

  // React plugin configuration
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Custom React rules
      'react/prop-types': 'off', // TypeScript handles this
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'react/jsx-uses-react': 'off', // Not needed with new JSX transform
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
];

export default config;

/* eslint-enable @typescript-eslint/naming-convention */
