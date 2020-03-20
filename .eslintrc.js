module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
  },
};
