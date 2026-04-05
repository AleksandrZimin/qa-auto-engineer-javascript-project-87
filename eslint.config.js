import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: ['node_modules', 'coverage', 'dist'],
  },
  js.configs.recommended,
  stylistic.configs.recommended,
  {
    rules: {
      'no-console': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/eol-last': ['error', 'always'],
    },
  },
]
