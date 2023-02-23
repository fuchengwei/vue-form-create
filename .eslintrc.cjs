module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard-with-typescript', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json', './vite.config.ts'],
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint'],

  rules: {
    'no-eval': 'off',
    'no-undef': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off'
  }
}
