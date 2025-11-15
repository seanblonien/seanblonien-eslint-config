import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import config from './index';

const overrideConfig = [
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
  it('should export an array of config objects', () => {
    expect(Array.isArray(config)).toBe(true);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should be a valid ESLint flat config', async () => {
    const eslint = new ESLint({
      overrideConfig: config,
      overrideConfigFile: true,
    });

    const result = await eslint.lintText('const x = 1;\n');
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should lint TypeScript code and expect one warning', async () => {
    const eslint = new ESLint({
      overrideConfig,
      overrideConfigFile: true,
    });

    const code = `
const greeting = 'Hello';
console.log(greeting);
`;

    const result = await eslint.lintText(code, { filePath: 'src/index.ts' });
    expect(result).toBeDefined();
    expect(result[0].warningCount).toBe(1);
  });

  it('should catch unused variables', async () => {
    const eslint = new ESLint({
      overrideConfig,
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
