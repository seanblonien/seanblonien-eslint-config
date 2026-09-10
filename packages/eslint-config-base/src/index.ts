/* eslint-disable @typescript-eslint/no-magic-numbers, @typescript-eslint/naming-convention -- config file */
import eslint from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import functionalPlugin from 'eslint-plugin-functional';
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

// Export shared utilities for use in other packages
export { booleanNameConvention, booleanNameExceptions, booleanNamePrefixes } from './boolean-naming';

type ResolvedEslintConfigBaseOptions = Readonly<{
  booleanNaming: boolean;
  camelCase: boolean;
  consoleRestriction: boolean;
}>;

const resolveOptions = (options: EslintConfigBaseOptions): ResolvedEslintConfigBaseOptions => ({
  booleanNaming: options.booleanNaming ?? true,
  camelCase: options.camelCase ?? false,
  consoleRestriction: options.consoleRestriction ?? false,
});

const namingConventionRule = (
  resolved: ResolvedEslintConfigBaseOptions,
): Linter.RuleEntry => [
  'warn',
  ...resolved.camelCase
    ? [
        {
          selector: 'property',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          filter: {
            regex: String.raw`^_|[- /?:{}@%]|Provider|Comp|^item$|^condition$|^container$|^Container$|^\d+$`,
            match: false,
          },
        },
        {
          selector: 'variableLike',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          trailingUnderscore: 'allow',
        },
      ]
    : [],
  {
    selector: 'variable',
    format: ['camelCase', 'PascalCase'],
    types: ['function'],
    filter: {
      regex: '^_|Comp|Provider|Stack|Wrapper|Root',
      match: false,
    },
  },
  {
    selector: 'typeLike',
    format: ['PascalCase'],
    filter: {
      regex: '^_|_$',
      match: false,
    },
  },
  ...resolved.booleanNaming
    ? [
        {
          selector: ['variable', 'property', 'parameter', 'typeProperty'],
          types: ['boolean'],
          format: ['UPPER_CASE', 'PascalCase'],
          prefix: booleanNamePrefixes,
          filter: {
            regex: booleanNameExceptions,
            match: false,
          },
        },
      ]
    : [],
];

/**
 * Options accepted by {@link eslintConfigBase} to opt in to rules that are off by default
 * because they misfire on code shaped by something other than this codebase's own authorship
 * choices — object literals/types that mirror an external wire format, or CLI/script entry
 * points where console output is the product. Prefer a narrow, commented
 * `// eslint-disable-next-line` at the specific external-shaped call site over turning one of
 * these on repo-wide, unless the whole project genuinely never touches such a boundary.
 */
export type EslintConfigBaseOptions = {
  /**
   * Warn when a boolean variable, parameter, or property doesn't carry an approved prefix
   * (`is`, `has`, `should`, `does`, ...). This is the useful half of naming-convention's boolean
   * checks — it only ever fires on names, never on values, so it doesn't have the external-API
   * false-positive problem {@link camelCase} does. On by default.
   *
   * @default true
   */
  booleanNaming?: boolean;
  /**
   * Warn when an identifier or object/type property isn't camelCase (or UPPER_CASE) — the
   * legacy `camelcase` core rule plus the matching half of `@typescript-eslint/naming-convention`
   * (property and variable/destructuring format checks; type and function-variable naming stay
   * PascalCase-checked regardless of this flag, since those are never dictated by external data).
   * Off by default: any project that decodes JSON from an external API, reads Node's `fs`
   * option objects, or mocks such payloads in tests will otherwise get warnings on every
   * snake_case field it cannot rename without breaking the contract.
   *
   * @default false
   */
  camelCase?: boolean;
  /**
   * Warn on `console.*` calls. Off by default: it's the right call for a library or long-running
   * service, but actively wrong for a CLI or script whose entire job is to print to the terminal.
   *
   * @default false
   */
  consoleRestriction?: boolean;
};

// Everything up through `functional/*` composes third-party recommended configs verbatim and
// never depends on EslintConfigBaseOptions, so it lives outside the factory function — a
// top-level array isn't a function body, so it isn't subject to max-lines-per-function below.
const RECOMMENDED_CONFIGS: Linter.Config[] = [
  // Base configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strict,

  // Plugin configurations
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
    indent: 2,
    quoteProps: 'consistent-as-needed',
    quotes: 'single',
    semi: true,
  }),
  importXPlugin.flatConfigs.recommended,
  importXPlugin.flatConfigs.typescript,
  sortPlugin.configs['flat/recommended'],
  unicornPlugin.configs.recommended,
  comments.recommended,
  sonarjsPlugin.configs.recommended,

  // Functional programming rules
  functionalPlugin.configs.externalTypeScriptRecommended,
  functionalPlugin.configs.recommended,
  functionalPlugin.configs.stylistic,
];

// The non-options-dependent metadata (everything but `rules`) of the main configuration block.
const MAIN_CONFIG_META: Omit<Linter.Config, 'rules'> = {
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
};

// The rules that don't depend on EslintConfigBaseOptions. `no-console`, `camelcase`, and
// `@typescript-eslint/naming-convention` are assembled separately in eslintConfigBase and merged
// on top of this object, since those three are the ones the options actually control.
const STATIC_MAIN_RULES: Linter.RulesRecord = {
  // === DISABLED CORE RULES (replaced by plugins) ===
  // These core ESLint rules are disabled because we use enhanced versions from plugins:
  'quotes': 'off', // Replaced by @stylistic/quotes with better formatting options and JSX support
  'jsx-quotes': 'off', // Replaced by @stylistic/jsx-quotes for JSX-specific quote handling
  'func-call-spacing': 'off', // Replaced by @stylistic/function-call-spacing for consistent spacing
  'dot-notation': 'off', // Replaced by @typescript-eslint/dot-notation with TypeScript awareness
  'no-unused-expressions': 'off', // Replaced by @typescript-eslint/no-unused-expressions with better TS support
  'no-use-before-define': 'off', // Replaced by @typescript-eslint/no-use-before-define for TypeScript hoisting rules
  'default-param-last': 'off', // Replaced by @typescript-eslint/default-param-last with TS parameter awareness
  'no-redeclare': 'off', // Replaced by @typescript-eslint/no-redeclare for better type checking
  'no-shadow': 'off', // Replaced by @typescript-eslint/no-shadow for TypeScript variable shadowing
  'spaced-comment': 'off', // Replaced by @stylistic/spaced-comment with more formatting options
  'no-unused-vars': 'off', // Replaced by @typescript-eslint/no-unused-vars and unused-imports plugin
  '@stylistic/no-unused-vars': 'off', // Replaced by unused-imports/no-unused-vars for better import handling
  'sonarjs/no-unused-vars': 'off', // Replaced by unused-imports/no-unused-vars to avoid conflicts
  'no-magic-numbers': 'off', // Replaced by @typescript-eslint/no-magic-numbers with TypeScript-aware exceptions

  // === DISABLED PLUGIN RULES (intentionally turned off) ===
  // Sort plugin rules (replaced by import-x/order):
  'sort/imports': 'off', // Replaced by import-x/order which has better TypeScript support
  'sort/object-properties': 'off', // Object property sorting is not required
  'sort/string-unions': 'off', // String union sorting is not required

  // Unicorn rules that are too restrictive or don't match our style:
  'unicorn/prefer-global-this': 'off', // GlobalThis is not always preferred over window/global
  'unicorn/prevent-abbreviations': 'off', // Common abbreviations (props, args, etc.) are acceptable
  'unicorn/no-array-reduce': 'off', // Array.reduce is a valid and useful method
  'unicorn/no-array-for-each': 'off', // Array.forEach is preferred over for...of in many cases
  'unicorn/prefer-top-level-await': 'off', // Top-level await is not always appropriate
  'unicorn/no-array-callback-reference': 'off', // Method references as callbacks are acceptable
  'unicorn/prefer-switch': 'off', // Switch statements are banned (see no-restricted-syntax below)
  'unicorn/prefer-object-from-entries': 'off', // Object.fromEntries is not always better
  'unicorn/no-null': 'off', // Null is still a valid value in many contexts

  // SonarJS rules that are disabled for various reasons:
  'sonarjs/cognitive-complexity': 'off', // Replaced by core complexity rule which is simpler
  'sonarjs/no-nested-functions': 'off', // Replaced by complexity rule, nested functions are sometimes needed
  'sonarjs/function-return-type': 'off', // TypeScript handles return type checking better
  'sonarjs/no-redundant-optional': 'off', // TypeScript handles optional types better
  'sonarjs/no-commented-code': 'off', // Performance-intensive rule, commented code is sometimes useful
  'sonarjs/todo-tag': 'off', // TODO comments are acceptable during development
  'sonarjs/pseudo-random': 'off', // Math.random() is acceptable for non-cryptographic uses
  'sonarjs/void-use': 'off', // Allow void operators for type assertions and async function annotations
  'sonarjs/no-nested-conditional': 'off', // Replaced by no-nested-ternary rule
  'sonarjs/no-hardcoded-passwords': 'off',
  'sonarjs/redundant-type-aliases': 'off',
  'sonarjs/prefer-read-only-props': 'off',
  'sonarjs/deprecation': 'off',

  // Import and testing rules:
  'import-x/no-named-as-default-member': 'off', // Named default exports are sometimes necessary

  // === STYLISTIC & FORMATTING ===
  '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
  '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
  '@stylistic/block-spacing': ['warn', 'never'],
  '@stylistic/object-curly-newline': [
    'warn',
    { ObjectPattern: { multiline: true, consistent: true } },
  ],
  '@stylistic/operator-linebreak': [
    'warn',
    'after',
    { overrides: { '?': 'before', ':': 'before' } },
  ],
  '@stylistic/max-len': [
    'warn',
    {
      code: 100,
      comments: 120,
      ignoreUrls: true,
      ignoreTrailingComments: true,
      ignorePattern: String.raw`^.*eslint-(disable|enable).+|it\(|ErrorCodes|@param|@return|^\s*\[[^\]]+\]:\s*.+?;$`,
      ignoreTemplateLiterals: true,
      ignoreStrings: true,
      ignoreRegExpLiterals: true,
    },
  ],
  '@stylistic/jsx-wrap-multilines': [
    'error',
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
    },
  ],
  '@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
  '@stylistic/comma-dangle': ['warn', 'always-multiline'],
  '@stylistic/comma-spacing': 'warn',
  '@stylistic/function-call-spacing': ['error'],
  '@stylistic/array-element-newline': ['warn', { multiline: true, consistent: true }],
  '@stylistic/array-bracket-newline': ['warn', 'consistent'],
  '@stylistic/no-mixed-operators': ['warn', { allowSamePrecedence: true }],
  '@stylistic/rest-spread-spacing': ['warn', 'never'],
  '@stylistic/spaced-comment': ['warn', 'always', { line: { markers: ['!', '?', '-', '**'] } }],
  '@stylistic/jsx-one-expression-per-line': 'warn',

  // === CODE QUALITY & STRUCTURE ===
  // Complexity and size limits:
  'complexity': ['warn', { max: 20 }], // Warn when cyclomatic complexity exceeds 20
  'max-lines-per-function': ['error', 120], // Error when functions exceed 120 lines
  'max-lines': ['error', { max: 600, skipBlankLines: true }], // Error when files exceed 900 lines

  // Code style preferences:
  'object-shorthand': ['warn', 'always'], // Use object shorthand ({ name } instead of { name: name })
  'arrow-body-style': ['warn', 'as-needed'], // Use concise arrow functions when possible
  'prefer-destructuring': 'warn', // Prefer destructuring for object/array access
  'prefer-arrow-callback': 'error', // Prefer arrow functions for callbacks
  'prefer-template': 'warn', // Use template literals instead of string concatenation
  'one-var': ['error', 'never'], // Declare each variable separately
  'no-bitwise': 'error', // Disallow bitwise operators (often used for obfuscation)

  // Parentheses and expression clarity:
  'no-extra-parens': [
    'error',
    'all',
    {
      ignoreJSX: 'all', // JSX requires parentheses for multi-line expressions
      enforceForArrowConditionals: false, // Allow parentheses in arrow conditionals
      nestedBinaryExpressions: false, // Allow parentheses for clarity in nested expressions
    },
  ],

  // === SECURITY & BEST PRACTICES ===
  // Prevent dangerous code execution patterns:
  'no-eval': 'error', // Disallows eval() which can execute arbitrary code
  'no-implied-eval': 'error', // Catches indirect eval usage (setTimeout with string, etc.)
  'no-new-func': 'error', // Prevents Function constructor which is similar to eval
  'no-script-url': 'error', // Disallows javascript: URLs which are XSS vectors

  // Error handling and promises:
  'prefer-promise-reject-errors': 'error', // Ensures promises are rejected with Error objects
  'no-throw-literal': 'error', // Prevents throwing non-Error objects (strings, numbers, etc.)

  // Code quality and safety:
  'no-unreachable-loop': 'error', // Catches loops with unreachable iterations
  'no-unsafe-negation': 'error', // Prevents unsafe negation patterns that can cause bugs
  'yoda': 'error', // Enforces consistent comparison order (variable == constant, not constant == variable)

  // Promise constructor safety:
  'no-promise-executor-return': 'error', // Prevents returning values from promise executor
  'no-async-promise-executor': 'error', // Prevents async promise constructors (anti-pattern)

  // === GENERAL JAVASCRIPT RULES ===
  'quote-props': ['warn', 'consistent-as-needed'],
  'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
  'function-call-argument-newline': ['warn', 'consistent'],
  'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
  'no-multi-spaces': 'warn',
  'no-useless-rename': 'warn',
  'arrow-spacing': 'warn',
  'space-infix-ops': 'warn',
  'comma-style': ['warn', 'last'],
  'no-nested-ternary': 'warn',
  'no-unneeded-ternary': 'warn',
  'no-else-return': 'error',
  'no-useless-concat': 'warn',
  'no-new': 'error',
  'no-extra-semi': 'error',
  'no-implicit-coercion': ['warn', { allow: ['!!'] }],
  'no-extra-boolean-cast': 'warn',
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: 'directive',
      next: '*',
    },
    {
      blankLine: 'any',
      prev: 'directive',
      next: 'directive',
    },
    {
      blankLine: 'never',
      prev: 'import',
      next: 'import',
    },
  ],

  // === TYPESCRIPT RULES ===
  // Type safety & preferences
  '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
  '@typescript-eslint/no-inferrable-types': ['warn', { ignoreParameters: true }],
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
  '@typescript-eslint/no-unnecessary-condition': 'warn',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/prefer-readonly': 'warn',
  '@typescript-eslint/no-invalid-void-type': 'error', // Void types are valid in many contexts (e.g., Promise<void>)
  '@typescript-eslint/no-misused-promises': 'error', // Too many false positives with promise handling

  // TypeScript consistency
  '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
  '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as' }],
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/consistent-type-exports': 'error',
  '@typescript-eslint/method-signature-style': 'error',

  // TypeScript equivalents of core rules
  '@typescript-eslint/no-redeclare': 'error',
  '@typescript-eslint/default-param-last': 'error',
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
  '@typescript-eslint/no-shadow': 'error',
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

  // Expressions and async
  '@typescript-eslint/no-confusing-void-expression': [
    'error',
    { ignoreArrowShorthand: true },
  ],
  '@typescript-eslint/no-meaningless-void-operator': 'error',

  // TypeScript modern preferences
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/prefer-reduce-type-parameter': 'error',
  '@typescript-eslint/prefer-string-starts-ends-with': 'error',

  // === IMPORTS & EXPORTS ===
  // Import path and structure validation:
  'import-x/no-absolute-path': 'warn', // Prevent absolute paths in imports (should use relative or package imports)
  'import-x/newline-after-import': ['warn', { count: 1 }], // Require exactly one blank line after imports
  'import-x/no-cycle': ['error', { maxDepth: 1, ignoreExternal: true }], // Prevent circular dependencies
  'import-x/order': ['warn',
    {
      'groups': [
        'builtin', // Node.js built-in modules
        'external', // Packages from node_modules
        ['type', 'internal'], // Type imports, Absolute imports (often aliased like 'src/components')
        'parent', // Relative imports from parent directories (../)
        'sibling', // Relative imports from sibling directories (./)
        'index', // Index file imports (./index.js)
        'object', // Imports from object notation
      ],
      'newlines-between': 'never',
    }],

  // === UNUSED IMPORTS & VARIABLES ===
  // Automatically remove unused imports:
  'unused-imports/no-unused-imports': 'error', // Error on unused imports (auto-fixable)

  // Handle unused variables with underscore convention:
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all', // Check all variables
      varsIgnorePattern: '^_', // Ignore variables starting with underscore
      args: 'after-used', // Only check arguments after the last used one
      argsIgnorePattern: '^_', // Ignore arguments starting with underscore
    },
  ],

  // === BANNED APIS ===
  // Ban imperative array/object operations in favor of modern syntax:
  'ban/ban': [
    'warn',
    {
      name: ['*', 'concat'],
      message: 'Array.concat is an imperative operation. Use ES6 spread syntax instead: [...items, newItem]',
    },
    {
      name: ['Object', 'assign'],
      message: 'Object.assign is imperative. Use the spread operator instead: {...obj}',
    },
  ],

  // === CODE STRUCTURE RESTRICTIONS ===
  // Enforce functional programming patterns:
  'no-loops/no-loops': 'error', // Ban for/while/do-while loops, use array methods instead

  // Enforce pattern-based conditional logic:
  'no-restricted-syntax': [
    'error',
    {
      selector: 'SwitchStatement',
      message: 'Switch statements are banned. Use `ts-pattern` library for pattern matching instead.',
    },
  ],

  // === ESLINT COMMENTS ===
  '@eslint-community/eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],

  // === TESTING LIBRARY ===
  'testing-library/no-render-in-lifecycle': ['error', { allowTestingFrameworkSetupHook: 'beforeEach' }],

  // === SORTING ===
  'sort/type-properties': 'warn',

  // === UNICORN ===
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

  // === SONARJS ===
  'sonarjs/no-duplicated-branches': 'warn',

  // === FUNCTIONAL ===
  'functional/prefer-immutable-types': 'off',
  'functional/functional-parameters': 'off',
  'functional/no-try-statement': 'off',
  'functional/no-return-void': 'off',
  'functional/no-expression-statements': 'off',
  'functional/no-conditional-statements': 'off',
  'functional/immutable-data': 'off',
  'functional/no-let': 'off',
  'functional/no-mixed-types': 'off',
};

// File-scoped overrides that never depend on EslintConfigBaseOptions.
const OVERRIDE_CONFIGS: Linter.Config[] = [
  // Config files overrides
  {
    files: ['**/*.config.{ts,js,mjs,cjs}'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'functional/functional-parameters': 'off',
    },
  },

  // Test files overrides - functional rules too strict for test code
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}', '**/tests/**', '**/__tests__/**'],
    rules: {
      'functional/no-expression-statements': 'off',
      'functional/no-return-void': 'off',
      'functional/no-let': 'off',
      'functional/functional-parameters': 'off',
      'functional/prefer-immutable-types': 'off',
    },
  },
];

/**
 * Sean Blonien's opinionated ESLint flat config for TypeScript/JavaScript projects.
 *
 * Callable with no arguments for sensible, low-noise defaults, or with {@link EslintConfigBaseOptions}
 * to opt specific projects into stricter naming/console rules.
 *
 * @example
 * ```ts
 * // eslint.config.ts
 * import eslintConfigBase from '@seanblonien/eslint-config-base';
 *
 * export default [
 *   ...eslintConfigBase(),
 *   { ignores: ['dist/**'] },
 * ];
 * ```
 *
 * @example
 * ```ts
 * // Opt a data-free internal package into full camelCase + console enforcement.
 * export default [...eslintConfigBase({ camelCase: true, consoleRestriction: true })];
 * ```
 */
export const eslintConfigBase = (options: EslintConfigBaseOptions = {}): Linter.Config[] => {
  const resolved = resolveOptions(options);

  return [
    ...RECOMMENDED_CONFIGS,
    {
      ...MAIN_CONFIG_META,
      rules: {
        ...STATIC_MAIN_RULES,
        'no-console': resolved.consoleRestriction ? 'warn' : 'off',
        'camelcase': resolved.camelCase
          ? ['warn', { allow: ['^_', 'content_type', 'reply_to'] }]
          : 'off',
        '@typescript-eslint/naming-convention': namingConventionRule(resolved),
      },
    },
    ...OVERRIDE_CONFIGS,
  ];
};

export default eslintConfigBase;

/* eslint-enable @typescript-eslint/no-magic-numbers  */
/* eslint-enable @typescript-eslint/naming-convention */
