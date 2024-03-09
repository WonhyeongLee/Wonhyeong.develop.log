module.exports = {
  ignorePatterns: [
    '**/public/**',
    '**/.cache/**',
    '**/static/**',
    '**/content/**',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  globals: {
    NodeJS: true,
    JSX: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true,
    __ASSET_PREFIX__: true,
    __GATSBY: true,
  },
  extends: [
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],

  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: false,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': [
      'error',
      require('os').EOL === '\r\n' ? 'windows' : 'unix',
    ],
    'no-unused-vars': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-var': ['error'],
    indent: ['error', 2],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        useTabs: false,
        endOfLine: 'auto',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        pathGroups: [
          { pattern: 'components/**', group: 'internal' },
          { pattern: 'utils/**', group: 'internal' },
          { pattern: 'hooks/**', group: 'internal' },
          { pattern: 'types/**', group: 'internal' },
          { pattern: 'styles/**', group: 'internal' },
          { pattern: 'pages/**', group: 'internal' },
          { pattern: 'templates/**', group: 'internal' },
          { pattern: 'context/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
