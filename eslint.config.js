import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: ['node_modules', 'coverage', 'dist'],
  },
  {
    files: ['**/*.js'],
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      'no-console': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/eol-last': ['error', 'always'],
    },
  },
  {
    files: ['**/__tests__/**/*.js'],
    languageOptions: { globals: { ...globals.jest } },
  },
]
