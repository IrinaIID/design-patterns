
// module.exports = {
//   env: {
//     node: true,
//     jest: true,
//   },
//   extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   root: true,
// }


module.exports = {
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};