module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended' /* https://github.com/typescript-eslint/typescript-eslint#readme */,
    'prettier',
  ],
  parserOptions: {},
  ignorePatterns: ['.eslintrc.js', 'dist/', 'node_modules/', 'jest.config.js'],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/interface-name-prefix':
      'off' /* https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/interface-name-prefix.md */,
    '@typescript-eslint/explicit-function-return-type':
      'off' /* https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md */,
    '@typescript-eslint/explicit-module-boundary-types':
      'off' /* https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md */,
    '@typescript-eslint/no-explicit-any':
      'off' /* https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md */,
  },
}
