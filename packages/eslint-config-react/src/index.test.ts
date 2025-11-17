import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import config from './index';

// Check if Next.js plugin is available
let hasNextPlugin = false;
try {
  // eslint-disable-next-line unicorn/prefer-module -- checking for optional peer dependency
  require.resolve('@next/eslint-plugin-next');
  hasNextPlugin = true;
} catch {
  // Next.js plugin not installed
}

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

export const Component: React.FC = () => {
  return <p>Hello</p>;
};
`;

    const result = await eslint.lintText(code, { filePath: 'test.tsx' });
    expect(result).toBeDefined();
  });

  it('should enforce React rules', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig,
    });

    // Explicitly break react/jsx-boolean-value rule - boolean props should not have ={true}
    const code = `import { useState } from 'react';

export const Component: React.FC = () => {
  const [isActive] = useState(true);

  return <button disabled={true}>Click me</button>;
};
`;

    const result = await eslint.lintText(code, { filePath: 'test.tsx' });
    expect(result[0].messages.some((m) => m.ruleId === 'react/jsx-boolean-value')).toBe(true);
  });
});

describe.skipIf(!hasNextPlugin)('@seanblonien/eslint-config-react - configWithNext', () => {
  it('should export configWithNext as a function returning an array', async () => {
    const { configWithNext } = await import('./index');
    const nextConfigArray = configWithNext();
    expect(Array.isArray(nextConfigArray)).toBe(true);
    expect(nextConfigArray.length).toBeGreaterThan(0);
  });

  it('should include Next.js plugin configuration', async () => {
    const { configWithNext } = await import('./index');
    const nextConfigArray = configWithNext();
    const nextConfig = nextConfigArray.find((c) => c.plugins?.['@next/next']);
    expect(nextConfig).toBeDefined();
    expect(nextConfig?.plugins?.['@next/next']).toBeDefined();
  });

  it('should include Next.js recommended rules', async () => {
    const { configWithNext } = await import('./index');
    const nextConfigArray = configWithNext();
    const nextConfig = nextConfigArray.find((c) => c.plugins?.['@next/next']);
    expect(nextConfig?.rules).toBeDefined();
    expect(Object.keys(nextConfig?.rules ?? {}).length).toBeGreaterThan(0);
  });

  it('should be a valid ESLint flat config with Next.js', async () => {
    const { configWithNext } = await import('./index');
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        ...configWithNext(),
        {
          languageOptions: {
            parserOptions: {
              projectService: {
                allowDefaultProject: ['test.tsx'],
              },
            },
          },
        },
      ],
    });

    const result = await eslint.lintText('const x = 1;\n');
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
