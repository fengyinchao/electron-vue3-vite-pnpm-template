# electron-vue3-vite-pnpm-template

基于 electron-vue3-vite-pnpm 开发的模板

# 开发

```shell
pnpm i
pnpm dev
```

# 分支管理

- test 测试环境
- master 生产环境

# 部署

- 合并到 test 分支自动发测试环境
- 合并到 master 分支，自动打包，成功后到部署系统: https://publisher.zonst.com 手动发版

# 协作流程

- 从 master 拉取功能分支，进行开发
- 开发完成合并到测试环境进行提测
- 测试通过后，向 master 分支提出 MR
- MR 通过后，关注构建结果，并前往部署系统: https://publisher.zonst.com 发版

# 开发一个新模块的基本流程

- 到 zlink 系统菜单管理模块去新建菜单
- 通过 pnpm new 的方式创建新模块，注意模块名要和菜单路由保持一致
- 关于类型，尽量复用后端定义的类型(@zonst-types/mahpilot-admin-v1)
