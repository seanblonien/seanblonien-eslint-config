import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import { eslintConfigBase } from './index';

const withProjectService = (config: ReturnType<typeof eslintConfigBase>) => [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.ts'],
        },
      },
    },
  },
];

describe('@seanblonien/eslint-config-base', () => {
  it('should be callable with no arguments and return an array of config objects', () => {
    const config = eslintConfigBase();
    expect(Array.isArray(config)).toBe(true);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should be a valid ESLint flat config', async () => {
    const eslint = new ESLint({
      overrideConfig: eslintConfigBase(),
      overrideConfigFile: true,
    });

    const result = await eslint.lintText('const x = 1;\n');
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should catch unused variables', async () => {
    const eslint = new ESLint({
      overrideConfig: withProjectService(eslintConfigBase()),
      overrideConfigFile: true,
    });

    const code = `
const unused = "I am not used";
const used = "I am used";
// eslint-disable-next-line no-console -- ignore
console.log(used);
`;

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result[0].errorCount).toBeGreaterThan(0);
    expect(result[0].messages.some((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toBe(true);
  });
});

describe('@seanblonien/eslint-config-base - consoleRestriction option', () => {
  const code = `
const greeting = 'Hello';
console.log(greeting);
`;

  it('does not warn on console calls by default (CLIs/scripts are common consumers)', async () => {
    const eslint = new ESLint({
      overrideConfig: withProjectService(eslintConfigBase()),
      overrideConfigFile: true,
    });

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result[0].messages.some((m) => m.ruleId === 'no-console')).toBe(false);
  });

  it('warns on console calls when explicitly enabled', async () => {
    const eslint = new ESLint({
      // eslint-disable-next-line @typescript-eslint/naming-convention -- EslintConfigBaseOptions field name
      overrideConfig: withProjectService(eslintConfigBase({ consoleRestriction: true })),
      overrideConfigFile: true,
    });

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result[0].messages.some((m) => m.ruleId === 'no-console')).toBe(true);
  });
});

describe('@seanblonien/eslint-config-base - camelCase option', () => {
  const code = `
export interface RemoteEvent {
  readonly start_date_local: string;
}
`;

  it('does not warn on non-camelCase properties by default (external wire formats are common)', async () => {
    const eslint = new ESLint({
      overrideConfig: withProjectService(eslintConfigBase()),
      overrideConfigFile: true,
    });

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result[0].messages.some((m) => m.ruleId === '@typescript-eslint/naming-convention')).toBe(false);
    expect(result[0].messages.some((m) => m.ruleId === 'camelcase')).toBe(false);
  });

  it('warns on non-camelCase properties when explicitly enabled', async () => {
    const eslint = new ESLint({
      // eslint-disable-next-line @typescript-eslint/naming-convention -- EslintConfigBaseOptions field name
      overrideConfig: withProjectService(eslintConfigBase({ camelCase: true })),
      overrideConfigFile: true,
    });

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result[0].messages.some((m) => m.ruleId === '@typescript-eslint/naming-convention')).toBe(true);
  });
});

describe('@seanblonien/eslint-config-base - booleanNaming option', () => {
  const code = `
export interface Options {
  readonly streaming: boolean;
}
`;

  it('warns on unprefixed boolean properties by default', async () => {
    const eslint = new ESLint({
      overrideConfig: withProjectService(eslintConfigBase()),
      overrideConfigFile: true,
    });

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result[0].messages.some((m) => m.ruleId === '@typescript-eslint/naming-convention')).toBe(true);
  });

  it('does not warn on unprefixed boolean properties when explicitly disabled', async () => {
    const eslint = new ESLint({
      // eslint-disable-next-line @typescript-eslint/naming-convention -- EslintConfigBaseOptions field name
      overrideConfig: withProjectService(eslintConfigBase({ booleanNaming: false })),
      overrideConfigFile: true,
    });

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result[0].messages.some((m) => m.ruleId === '@typescript-eslint/naming-convention')).toBe(false);
  });
});
