# 更新日志

## 2.1.2 (2024-11-27)

### Features
* 新增git子模块别名解析
* 新增prettier格式化支持
* 新增低码发布菜单跳转适配

### Bug Fixes
* 修复git子模块扩展菜单组件解析

## 2.1.1 (2024-11-06)

### Features
* `vue`版本锁定至3.3.4
* `Header`新增组织切换
* 新增git子模块
* 新增模块菜单数据整合
* 新增日志管理

### Bug Fixes
* 修复404页面无法渲染
* 优化组织切换重新创建ws
* 优化`Search`组件中style使用

## 2.1.0 (2024-09-05)

### Features
* 新增日历管理
* 新增地区管理
* 新增encodeQuery文件
* 新增api管理
* 新增BatchDropdown，ConfirmModal，Player 组件
* 新增国际化文件
* 新增api管理

### Bug Fixes
* 优化用户状态不显示
* 优化路由不显示页面
* 删除`components/Table`
* 删除`hooks/useRequest`，替换为`@jetlinks-web/hooks`中的`useRequest`
* 删除data-collect模块；删除未使用的api接口
* 删除Log模块
* 删除未使用的插件
* 替换 `@/utils/axios` 为 `@jetlinks-web/core`, 更新api下所有接口的使用
* 更新 `jetlinks-web/components`，更新`ProTable`的使用参数
* 优化全局样式文件
* 优化登录逻辑
* 优化初始化页面业务代码

## 2.0.1 (2024-08-13)

### Features
* 【数据字典】新增queryDicItemNoPage
* 新增脚手架初始化系统功能

### Bug Fixes
* 【菜单管理】修复子级菜单新增pid参数错误
* 【登录页】携带verifyKey
* 【菜单管理】修复无法保存更新
* 【角色管理】修复分配权限异常报错


## 2.0.0 (2024-05-06)

### Features
* 更新版本依赖
* 集成mircoApp

### Bug Fixes
* 优化@jetlinks-web/components组件导入
* 优化路由使用方式
* 优化formatTime指令
* 优化userRouterParams为useRouterParams
* 优化useRequest引入路径
* 优化部分样式和代码逻辑
