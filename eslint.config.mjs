import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier/flat'
import importX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * ESLint 10 flat config, assembled from individual plugins.
 *
 * `eslint-config-next` is deliberately not used: it pins
 * `eslint-plugin-react@7.37.x`, which calls the `context.getFilename()` API
 * that ESLint 10 removed, so it throws while loading its first React rule.
 * Staying on ESLint 9 to accommodate it is not an option either — 9.x is past
 * end of life and npm marks it deprecated. So the pieces are wired up
 * directly: `@next/eslint-plugin-next` declares no peer range and supplies the
 * same Next.js rules `eslint-config-next` would have enabled.
 */
export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
  ]),

  js.configs.recommended,
  tseslint.configs.recommended,
  // `configs['recommended-latest']` is the eslintrc shape; the flat-config
  // equivalents live one level down under `configs.flat`.
  reactHooks.configs.flat['recommended-latest'],
  jsxA11y.flatConfigs.recommended,

  {
    // Only TypeScript sources: the project service resolves files through
    // tsconfig, and config files at the repository root are not in it.
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      'import-x': importX,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: { alwaysTryTypes: true },
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Unused values are a bug, not a style preference — but allow the
      // leading-underscore convention for deliberately discarded bindings.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // `import type` is load-bearing under `verbatimModuleSyntax`.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'object-shorthand': 'error',
      'prefer-const': 'error',
    },
  },

  {
    // Type declaration files legitimately declare things nothing imports.
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    // Tooling that Node runs directly, rather than browser code bundled by
    // Next — so it gets Node's globals and may write to stdout.
    files: ['scripts/**/*.{mjs,ts}', '*.config.{mjs,ts}', 'e2e/**/*.ts'],
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Must stay last: switches off every rule that would fight Prettier.
  prettier,
])
