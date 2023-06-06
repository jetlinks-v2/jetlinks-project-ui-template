# jetlinks-project-ui-template

## .env.development

``` shell
# 代理标识

VITE_APP_BASE_API = /api

# 代理配置

VITE_PROXY = [["/api","http://120.77.179.54:8844"]]

#  token标识
VITE_TOKEN_KEY = X-Access-Token

```

## 运行

```shell
# 安装依赖
pnpm install

# 运行
pnpm dev
```

## 依赖包

### @jetlinks/vite

vite相关配置

### @jetlinks/tsconfig

tsconfig相关配置

### @jetlinks/components

通用业务组件

### @jetlinks/constants

常量，常用的有 `TOKEN_KEY`、`BASE_API`

### @jetlinks/core

基本核心库，包含 axios，websocket

### @jetlinks/hooks

包含常用的 `useRequest` `useRouterParams` `useWebSocket`

### @jetlinks/router

通用路由配置

### @jetlinks/utils

通用工具函数

