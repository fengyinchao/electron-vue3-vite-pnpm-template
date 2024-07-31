#!/usr/bin/env node

module.exports = async function (plop) {
  plop.setGenerator('page', {
    // 这里的 module 是一个自己设定的名字，在执行命令行的时候会用到
    description: '生成一个页面', // 这里是对这个plop的功能描述
    prompts: [
      {
        type: 'input', // 问题的类型
        name: 'moduleName', // 问题对应得到答案的变量名，可以在actions中使用该变量
        message: '一级菜单名称', // 在命令行中的问题
        default: 'system', // 问题的默认答案
      },
      {
        type: 'input', // 问题的类型
        name: 'menuName1', // 问题对应得到答案的变量名，可以在actions中使用该变量
        message: '二级菜单名称', // 在命令行中的问题
        default: 'xx-table', // 问题的默认答案
      },
      {
        type: 'input', // 问题的类型
        name: 'menuName2', // 问题对应得到答案的变量名，可以在actions中使用该变量
        message: '三级菜单名称(可不填)', // 在命令行中的问题
        default: '', // 问题的默认答案
      },
    ],
    actions: data => {
      const moduleName = '{{moduleName}}'
      const menuName1 = '{{menuName1}}'
      const menuName2 = '{{menuName2}}'
      const menuName2PascalCase = '{{pascalCase menuName2}}'
      const menuName1PascalCase = '{{pascalCase menuName1}}'
      const actions = [
        {
          type: 'add', // 操作类型，这里是添加文件
          path: data.menuName2
            ? `src/views/${moduleName}/${menuName1}/${menuName2}/${menuName2PascalCase}.vue`
            : `src/views/${moduleName}/${menuName1}/${menuName1PascalCase}.vue`, // 模板生成的路径
          templateFile: 'plop-templates/view/index.vue', // 模板的路径
          data: {
            moduleName,
            menuName1,
            menuName2,
          },
        },
        {
          type: 'add', // 操作类型，这里是添加文件
          path: data.menuName2
            ? `src/views/${moduleName}/${menuName1}/${menuName2}/AddViewEditDialog.vue`
            : `src/views/${moduleName}/${menuName1}/AddViewEditDialog.vue`, // 模板生成的路径
          templateFile: 'plop-templates/view/components/AddViewEditDialog.vue', // 模板的路径
          data: {
            moduleName,
            menuName1,
            menuName2,
          },
        },
      ]
      return actions
    },
  })
}
