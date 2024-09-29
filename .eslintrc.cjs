module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    '@feature-sliced',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['import', '@typescript-eslint', 'vue'],
  rules: {
    'vue/multi-word-component-names' : 0,
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        globals: ['RouterView'],
        registeredComponentsOnly: true,
      },
    ],
    'vuejs-accessibility/anchor-has-content': 0,
    'vue/no-mutating-props': 0,
    'vuejs-accessibility/mouse-events-have-key-events': 0,
    'vue/no-setup-props-destructure': 0,
    'vuejs-accessibility/label-has-for': 0,
    'import/prefer-default-export': 0,
    'vuejs-accessibility/form-control-has-label': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'no-unused-vars': 'off',
    'vuejs-accessibility/click-events-have-key-events': 0,
    'import/extensions': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
        },
      },
    ],

    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['acc'],
      },
    ],
    'prettier/prettier': ['warn'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'type', 'internal', 'object', 'parent', 'index', 'sibling'],
        pathGroups: [
          {
            pattern: '@/app/**',
            group: 'index',
          },
          {
            pattern: '@/constants',
            group: 'index',
          },
          {
            pattern: '@/pages/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: '@/widgets/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: '@/features/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: '@/entities/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: '@/shared/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: './**',
            group: 'index',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          ['template', 'render'],
          'name',
          ['components', 'directives', 'filters'],
          'inheritAttrs',
          ['props', 'propsData'],
          'emits',
          'setup',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
        ],
      },
    ],
    'import/no-internal-modules': 0,
  },
};
