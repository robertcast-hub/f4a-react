import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jasmine },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', ignoreRestSiblings: true }],
    },
  },
  {
    // Los archivos de prueba no se recargan en caliente: la regla de Fast Refresh no aplica
    files: ['**/*.spec.{js,jsx}', 'src/test/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['karma.conf.cjs'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
  },
])
