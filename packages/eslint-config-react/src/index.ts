/* eslint-disable @typescript-eslint/naming-convention -- config file */
import baseConfig, { booleanNameConvention } from '@seanblonien/eslint-config-base';
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
    files: ['**/*.{tsx,jsx}'],
    languageOptions: {
      globals: {
        React: 'readonly',
      },
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
      // TS rule overrides for JSX files
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'unicorn/filename-case': [
        'warn',
        {
          cases: { pascalCase: true, kebabCase: true },
        },
      ],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      // --- React Rules ---
      // General React rules
      'react/style-prop-object': 'off', // Keep off for RN
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'react/no-multi-comp': ['error', { ignoreStateless: true }],
      'react/no-array-index-key': 'warn',
      'react/void-dom-elements-no-children': 'error',
      'react/destructuring-assignment': ['warn', 'always'],
      'react/boolean-prop-naming': ['warn', { rule: booleanNameConvention }],

      // Component definition rules
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/self-closing-comp': 'warn',

      // JSX formatting rules
      'react/jsx-curly-brace-presence': 'warn',
      'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-first-prop-new-line': ['warn'],
      'react/jsx-tag-spacing': ['warn', { beforeClosing: 'never' }],
      'react/jsx-key': 'error',
      'react/jsx-max-depth': ['error', { max: 6 }],
      'react/jsx-no-comment-textnodes': 'warn',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-props-no-multi-spaces': 'error',

      // JSX multiline formatting
      '@stylistic/multiline-ternary': ['warn', 'always-multiline', { ignoreJSX: true }],
      '@stylistic/jsx-wrap-multilines': [
        'warn',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'ignore',
          logical: 'ignore',
          prop: 'ignore',
        },
      ],

      // Props handling rules
      'react/jsx-sort-props': ['warn', { shorthandFirst: true, callbacksLast: true, reservedFirst: true }],
      'react/jsx-props-no-spreading': [
        'error',
        {
          exceptions: [
            'ScrollView',
            'Component',
            'Container',
            'Screen',
            'AppProvider',
            'Checkbox.Item',
            'TextInputPaper',
            'StatusIcon',
            'CircularProgressBase',
            'CircularProgress',
          ],
        },
      ],

      // --- React Hooks Rules ---
      'react-hooks-addons/no-unused-deps': 'warn',
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks:
            '(useEffectIgnoreFirstRender|useAsyncEffect|useEffectDebounce|useEffectIgnoreFirstRender|useEffectInterval|useMemoCache|useMemoCacheKey|useMemoTiming|useCallbackThrottle)',
        },
      ],
    },
  },
];

type NextPlugin = {
  configs: {
    'core-web-vitals': Linter.Config;
    'recommended': Linter.Config;
  };
};

/**
 * React ESLint config with Next.js plugin support.
 * Requires @next/eslint-plugin-next to be installed as a peer dependency.
 *
 * @example
 * ```ts
 * import { configWithNext } from '@seanblonien/eslint-config-react';
 *
 * export default await configWithNext();
 * ```
 */
export const configWithNext = async (): Promise<Linter.Config[]> => {
  try {
    const mod = (await import('@next/eslint-plugin-next')) as NextPlugin | { default: NextPlugin };
    const nextPlugin: NextPlugin = 'default' in mod ? mod.default : mod;

    return [
      ...config,
      {
        plugins: {
          '@next/next': nextPlugin,
        },
        rules: {
          ...nextPlugin.configs.recommended.rules,
          ...nextPlugin.configs['core-web-vitals'].rules,
        },
      },
    ];
  } catch {
    throw new Error(
      '@next/eslint-plugin-next is required to use configWithNext. ' +
      'Install it with: pnpm add -D @next/eslint-plugin-next',
    );
  }
};

export default config;

/* eslint-enable @typescript-eslint/naming-convention */
