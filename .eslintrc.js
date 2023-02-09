module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
    // jest: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // js/ts
    indent: ['error', 2, { 'SwitchCase': 1 }],
    quotes: ['error', 'single', { 'avoidEscape': true }],
    'comma-dangle': ['error', 'never'], // 禁止对象尾逗号
    // 禁止特定语法
    'no-restricted-syntax': [
      'error',
      'WithStatement' // with 语句
      // "BinaryExpression[operator='in']" // in 运算符
    ],
    'no-undef': 'off',

    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
