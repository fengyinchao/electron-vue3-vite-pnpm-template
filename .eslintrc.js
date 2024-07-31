/*
 * @Author: fengyinchao@zonst.cn
 * @Date: 2023-06-20 09:17:53
 * @LastEditTime: 2024-07-24 15:19:32
 */

const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  }, // 启用的规则

  extends: ['plugin:vue/vue3-recommended', 'standard', 'plugin:prettier/recommended'],
  parserOptions: {
    // js的版本
    ecmaVersion: 13, // 解析器
    parser: '@typescript-eslint/parser', // 模块化方案
    sourceType: 'module',
  },

  // 引用的插件  下载的插件去掉eslint-plugin-前缀引入
  plugins: ['vue', '@typescript-eslint', 'prettier', 'import', 'promise', '@zonst/fed', 'check-file'], // 自定义规则
  rules: {
    '@zonst/fed/file-header-annotation': 2,
    'vue/multi-word-component-names': 0,
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{jsx,tsx,vue}': 'PASCAL_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**/': 'KEBAB_CASE',
      },
    ],
    curly: 'error',
    camelcase: 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: { 'no-undef': 'off' },
    },
    {
      files: ['*.d.ts', '*.tsx', '*.vue'],
      rules: { 'no-unused-vars': 'off' },
    },
  ],
})
