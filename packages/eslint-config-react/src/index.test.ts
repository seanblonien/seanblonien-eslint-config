import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import config from './index';

const overrideConfig = [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['test.tsx'],
        },
      },
    },
  },
];

describe('@seanblonien/eslint-config-react', () => {
  it('should export an array of config objects', () => {
    expect(Array.isArray(config)).toBe(true);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should be a valid ESLint flat config', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig,
    });

    const result = await eslint.lintText('const x = 1;\n');
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should lint React JSX code', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig,
    });

    const code = `
import React from 'react';

const Component = () => {
  return <div>Hello</div>;
};

export default Component;
`;

    const result = await eslint.lintText(code, { filePath: 'test.tsx' });
    expect(result).toBeDefined();
  });

  it('should enforce React rules', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig,
    });

    // Self-closing component should be enforced
    const code = `
const Component = () => {
  return <div></div>;
};
`;

    const result = await eslint.lintText(code, { filePath: 'test.tsx' });
    expect(result[0].messages.some((m) => m.ruleId === 'react/self-closing-comp')).toBe(true);
  });
});
