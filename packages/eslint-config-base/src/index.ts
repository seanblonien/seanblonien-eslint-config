/* eslint-disable @typescript-eslint/no-magic-numbers -- config file */
/* eslint-disable @typescript-eslint/naming-convention -- config file */
import eslint from '@eslint/js';
// @ts-expect-error - no types available
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importXPlugin from 'eslint-plugin-import-x';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import sortPlugin from 'eslint-plugin-sort';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// @ts-expect-error - no types available
import noLoopsPlugin from 'eslint-plugin-no-loops';
// @ts-expect-error - no types available
import banPlugin from 'eslint-plugin-ban';
import type { Linter } from 'eslint';
import { booleanNameExceptions, booleanNamePrefixes } from './boolean-naming';

type Plugin = typeof testingLibraryPlugin;

const config: Linter.Config[] = [
  // Base recommended rules from ESLint
  eslint.configs.recommended,

  // TypeScript recommended configs
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strict,

  // Apply stylistic rules with customized settings
  stylistic.configs.customize({
    arrowParens: true,
    // jsx: true,
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
    indent: 2,
    quoteProps: 'consistent-as-needed',
    quotes: 'single',
    semi: true,
  }),

  // Import plugin configuration
  importXPlugin.flatConfigs.recommended,
  importXPlugin.flatConfigs.typescript,
  sortPlugin.configs['flat/recommended'],

  // Code quality plugins
  unicornPlugin.configs.recommended,
  (comments as { recommended: Linter.Config }).recommended,
  sonarjsPlugin.configs.recommended,

  // General JavaScript/TypeScript configuration
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
        ...globals.vitest,
      },
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: true,
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      'no-loops': noLoopsPlugin as Plugin,
      'ban': banPlugin as Plugin,
      'testing-library': testingLibraryPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // --- Stylistic Rules ---
      // Core rules turned off in favor of stylistic rules
      'quotes': 'off',
      'jsx-quotes': 'off',
      'func-call-spacing': 'off',
      'dot-notation': 'off',
      'no-unused-expressions': 'off',
      'no-use-before-define': 'off',
      'default-param-last': 'off',
      'no-redeclare': 'off',
      'no-shadow': 'off',

      // Stylistic (overrides vs stylistic recommended)
      'quote-props': ['warn', 'consistent-as-needed'],
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
      '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/block-spacing': ['warn', 'never'],
      '@stylistic/object-curly-newline': [
        'warn',
        { ObjectPattern: { multiline: true, consistent: true } },
      ],
      'object-property-newline': [
        'warn',
        { allowAllPropertiesOnSameLine: true },
      ],
      'function-call-argument-newline': ['warn', 'consistent'],
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
      'no-multi-spaces': 'warn',
      'arrow-spacing': 'warn',
      'space-infix-ops': 'warn',
      '@stylistic/operator-linebreak': [
        'warn',
        'after',
        { overrides: { '?': 'before', ':': 'before' } },
      ],
      'comma-style': ['warn', 'last'],
      'complexity': ['warn', { max: 20 }],
      '@stylistic/max-len': [
        'warn',
        {
          code: 100,
          comments: 120,
          ignoreUrls: true,
          ignoreTrailingComments: true,
          ignorePattern:
        String.raw`^.*eslint-(disable|enable).+|it\(|ErrorCodes|@param|@return|^\s*\[[^\]]+\]:\s*.+?;$`,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'max-lines-per-function': ['error', 120],
      'max-lines': ['error', { max: 900, skipBlankLines: true }],
      'func-style': ['warn', 'expression'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'never', prev: '*', next: 'import' },
      ],
      'object-shorthand': ['warn', 'always'],
      'arrow-body-style': ['warn', 'as-needed'],
      'prefer-destructuring': 'warn',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'warn',
      'one-var': ['error', 'never'],
      'no-bitwise': 'error',

      // TypeScript equivalents and customizations
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/require-await': 'off',
      'no-return-await': 'warn',
      'no-nested-ternary': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-else-return': 'warn',
      'no-constant-condition': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        { variables: true, functions: false },
      ],
      'no-console': 'warn',
      'no-useless-concat': 'warn',
      'no-new': 'error',
      'no-implicit-coercion': ['warn', { allow: ['!!'] }],
      'no-extra-boolean-cast': 'warn',

      // Magic numbers
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignoreEnums: true,
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreTypeIndexes: true,
          ignore: [0, 1, -1, 2],
        },
      ],

      // More stylistic specifics
      '@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/comma-spacing': 'warn',
      '@stylistic/function-call-spacing': ['error'],

      // Naming
      'camelcase': ['warn', { allow: ['^_', 'content_type', 'reply_to'] }],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'property',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          filter: {
            regex:
          String.raw`^_|[- /?:{}@%]|Provider|Mui|Comp|^item$|^condition$|^container$|^Container$|^\d+$`,
            match: false,
          },
        },
        {
          selector: 'variableLike',
          format: ['camelCase', 'UPPER_CASE'],
          trailingUnderscore: 'allow',
          filter: { regex: '^_|Comp|Container|Provider|Stack|Root', match: false },
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase'],
          types: ['function'],
          filter: { regex: '^_|Comp|Provider|Stack', match: false },
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          filter: { regex: '^_|_$', match: false },
        },
        {
          selector: ['variable', 'property', 'parameter', 'typeProperty'],
          types: ['boolean'],
          format: ['UPPER_CASE', 'PascalCase'],
          prefix: booleanNamePrefixes,
          filter: { regex: booleanNameExceptions, match: false },
        },
      ],

      // TS type safety and preferences
      '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
      '@typescript-eslint/no-inferrable-types': ['warn', { ignoreParameters: true }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        { ignorePrimitives: { string: true } },
      ],
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description', 'ts-ignore': 'allow-with-description' },
      ],
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-wrapper-object-types': 'warn',
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],
      '@stylistic/array-element-newline': ['warn', { multiline: true, consistent: true }],
      '@stylistic/array-bracket-newline': ['warn', 'consistent'],
      '@stylistic/no-mixed-operators': ['warn', { allowSamePrecedence: true }],
      '@stylistic/rest-spread-spacing': ['warn', 'never'],
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',

      // TS consistency
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/method-signature-style': 'error',

      // Expressions and async
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-var-requires': 'off',

      // TS modern prefs
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',

      // --- Comment Formatting Rules ---
      'spaced-comment': 'off',
      '@stylistic/spaced-comment': ['warn', 'always', { line: { markers: ['!', '?', '-', '**'] } }],

      // --- Unused Variables & Imports Rules ---
      'no-unused-vars': 'off',
      '@stylistic/no-unused-vars': 'off',
      'sonarjs/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // --- Banned API Rules ---
      'ban/ban': [
        'warn',
        {
          name: ['*', 'concat'],
          message:
            'Imperative operation: prefer use ES6 spread, i.e. [...items, newItem]',
        },
        {
          name: ['Object', 'assign'],
          message: 'Use the spread operator `{...obj}` instead',
        },
      ],

      // --- Code Structure Restrictions ---
      // No loops rule
      'no-loops/no-loops': 'error',

      // Syntax restrictions
      'no-restricted-syntax': [
        'error',
        {
          selector: 'SwitchStatement',
          message:
            'Switch statements are banned. Use `ts-pattern` instead.',
        },
      ],

      // --- ESLint Comments Rules ---
      '@eslint-community/eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],

      // --- Testing Library Rules ---
      'testing-library/no-render-in-lifecycle': ['error', { allowTestingFrameworkSetupHook: 'beforeEach' }],
      'testing-library/no-unnecessary-act': 'off',

      // --- Import Rules ---
      // Commented out rules kept for reference
      // 'import/no-default-export': 'warn',
      // 'import/no-restricted-paths': ['warn', { zones: restrictedPaths }], // Define restrictedPaths
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-absolute-path': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-cycle': ['error', { maxDepth: 1, ignoreExternal: true }],
      'import-x/order': ['warn',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // Packages from node_modules
            ['type', 'internal'], // Type imports, Absolute imports (often aliased like 'src/components')
            'parent', // Relative imports from parent directories (../)
            'sibling', // Relative imports from sibling directories (./)
            'index', // Index file imports (./index.js)
            'object', // Imports from object notation
          ],
        }],

      // --- Sort Rules ---
      'sort/imports': 'off', // use 'import-x/order' rule instead
      'sort/object-properties': 'off',
      'sort/type-properties': 'warn',
      'sort/string-unions': 'off',

      // --- Unicorn Rules ---
      'unicorn/prefer-global-this': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/prefer-object-from-entries': 'off',
      'unicorn/no-null': 'off',
      'unicorn/filename-case': [
        'warn',
        {
          cases: { camelCase: true, kebabCase: true },
          ignore: [/\.(js|cjs)$/], // Keep ignoring JS/CJS if needed
        },
      ],
      'unicorn/no-unused-properties': 'warn',
      'unicorn/consistent-destructuring': 'warn',
      'unicorn/no-useless-undefined': ['warn', { checkArguments: false }],

      // --- SonarJS Rules ---
      'sonarjs/no-duplicated-branches': 'warn',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/deprecation': 'off',
      'sonarjs/cognitive-complexity': 'off', // use 'complexity' rule instead
      'sonarjs/no-nested-functions': 'off', // use 'complexity' rule instead
      'sonarjs/function-return-type': 'off', // use '@typescript-eslint/explicit-module-boundary-types' rule instead
      'sonarjs/no-redundant-optional': 'off', // use '@typescript-eslint/no-redundant-optional' rule instead
      'sonarjs/no-commented-code': 'off', // slow rule
      'sonarjs/todo-tag': 'off', // eventually re-enable
      'sonarjs/pseudo-random': 'off',
      'sonarjs/different-types-comparison': 'off', // too many false positives
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/void-use': 'off', // allow to annotate async functions not explicitly awaited
      'sonarjs/no-nested-conditional': 'off', // use 'no-nested-ternary' rule instead
      'sonarjs/no-hardcoded-passwords': 'off',
    },
    settings: {
      'import-x/extensions': ['.js', '.cjs', '.mjs'],
      'import-x/parsers': { 'typescript-eslint': ['.ts', '.tsx'] },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          bun: true,
        }),
      ],
    },
  },

  // Config files overrides
  {
    files: ['**/*.config.{ts,js,mjs,cjs}'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];

export default config;

/* eslint-enable @typescript-eslint/no-magic-numbers  */
/* eslint-enable @typescript-eslint/naming-convention */
