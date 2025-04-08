import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
      'src/modules',
      'vite.config.ts',
      'src/vite-env.d.ts',
      'src/auto-imports.d.ts',
      'scripts',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'linebreak-style': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      'vue/multi-word-component-names': 'off',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'vue/valid-template-root': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-this-alias': 0,
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': false,
        },
      ],
      'no-useless-escape': 0,
      // 允许忽略未使用的变量（以 _ 开头或名为 _）
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",  // 忽略未使用的变量（以 _ 开头）
        }
      ]
    },
  },
  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
      'no-undef': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-function': 0,
      'vue/require-v-for-key': 0,
      'no-async-promise-executor': 0,
      'vue/valid-v-for': 1,
      // 允许忽略未使用的变量（以 _ 开头或名为 _）
      // "no-unused-vars": [
      //   "error",
      //   {
      //     argsIgnorePattern: "_",  // 忽略未使用的函数参数（以 _ 开头）
      //     varsIgnorePattern: "_",  // 忽略未使用的变量（以 _ 开头）
      //     caughtErrorsIgnorePattern: "_" // 忽略未使用的 catch 参数
      //   }
      // ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': false,
        },
      ],
    },
  },
];
