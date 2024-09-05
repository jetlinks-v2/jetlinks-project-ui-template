# 更新日志

## 2.1.0 (2024-09-05)

* 新增日历管理
* 新增地区管理
* 新增encodeQuery文件
* 新增api管理
* 添加BatchDropdown，ConfirmModal，Player 组件
* 添加国际化文件
* 添加api管理
* 删除`components/Table`
* 删除`hooks/useRequest`，替换为`@jetlinks-web/hooks`中的`useRequest`
* 替换 `@/utils/axios` 为 `@jetlinks-web/core`, 更新api下所有接口的使用
* 更新 `jetlinks-web/components`，更新`ProTable`的使用参数
* 优化全局样式文件
* 优化登录逻辑
* 优化初始化页面业务代码
* 删除data-collect模块；删除未使用的api接口
* 删除Log模块
* 删除未使用的插件
* 优化用户状态不显示
* 优化路由不显示页面

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
