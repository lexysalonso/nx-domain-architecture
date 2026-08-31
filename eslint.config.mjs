import path from 'node:path';
import { fileURLToPath } from 'node:url';
import angularEslint from 'angular-eslint';
import tseslint from 'typescript-eslint';
import nxPlugin from '@nx/eslint-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // ── Ignorar artefactos de build ──
  { ignores: ['**/dist', '**/out-tsc'] },

  // ── TypeScript: solo archivos .ts ──
  ...tseslint.configs.recommended.map((cfg) => ({
    ...cfg,
    files: ['**/*.ts'],
  })),

  // ── Parser config para project references ──
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
      },
    },
  },

  // ── Module boundaries (solo en .ts) ──
  {
    files: ['**/*.ts'],
    plugins: { '@nx': nxPlugin },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          depConstraints: [
            { sourceTag: 'scope:app', onlyDependOnLibsWithTags: ['scope:core', 'scope:shared', 'scope:clientes', 'scope:products'] },
            { sourceTag: 'scope:core', onlyDependOnLibsWithTags: ['scope:core'] },
            { sourceTag: 'scope:shared', onlyDependOnLibsWithTags: ['scope:shared', 'scope:core'] },
            { sourceTag: 'scope:clientes', onlyDependOnLibsWithTags: ['scope:clientes', 'scope:shared', 'scope:core'] },
            { sourceTag: 'scope:products', onlyDependOnLibsWithTags: ['scope:products', 'scope:shared', 'scope:core'] },
            { sourceTag: 'type:model', onlyDependOnLibsWithTags: ['type:model'] },
            { sourceTag: 'type:data-access', onlyDependOnLibsWithTags: ['type:model', 'type:data-access', 'type:core'] },
            { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:model', 'type:data-access', 'type:feature', 'type:ui'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:model', 'type:ui'] },
            { sourceTag: 'type:core', onlyDependOnLibsWithTags: ['type:core'] },
          ],
        },
      ],
    },
  },

  // ── Angular template parser (para que @if/@for no den error) ──
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularEslint.templateParser,
    },
  },
];
