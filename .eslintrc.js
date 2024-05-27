module.exports = {
  // 무시할 파일 패턴
  ignorePatterns: ['**/public/**', '**/.cache/**', '**/static/**', '**/content/**'],

  // 실행 환경 설정
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  // 파서 설정
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: 'module',
  },

  // 전역 변수 선언
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
    'plugin:prettier/recommended',
  ],

  plugins: ['@typescript-eslint', 'import', 'prettier', 'react-hooks'],

  rules: {
    // TypeScript 규칙
    '@typescript-eslint/type-annotation-spacing': 2,
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],

    // React 규칙
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 0,

    // 일반 JavaScript 규칙
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    eqeqeq: ['error', 'smart'],
    curly: ['error', 'all'],

    // 코드 스타일과 포매팅 관련 규칙
    'prettier/prettier': ['warn', { useTabs: false, endOfLine: 'auto', trailingComma: 'es5' }],

    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },

  // 설정 옵션
  settings: {
    'import/resolver': { typescript: { project: './tsconfig.json' } },
  },
};
