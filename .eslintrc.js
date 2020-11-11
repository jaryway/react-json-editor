module.exports = {
  env: { browser: true, es6: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    // 'standard',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'prettier/babel',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': [0],
    'react/display-name': [0],
    'no-unused-vars': [0],
    /* 关闭 eslint 的 no-unused-vars，
     开启 ts 的 no-unused-vars 提示就行，fix inport interface 报错 */
    '@typescript-eslint/no-unused-vars': [1, { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
  },
};
