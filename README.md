# jetlinks-project-ui-template

## .env.development

``` shell
# public path
VITE_PUBLIC_PATH = /

# 代理标识
VITE_APP_BASE_API = /api

# 代理配置
VITE_PROXY = [["/api","http://120.77.179.54:8844"]]

# 配置多个代理
# VITE_PROXY = [
#     ["/login","http://120.77.179.54:8844"],
#     ["/api","http://192.168.33.46:8844"]
# ]

#  token标识
VITE_TOKEN_KEY = X-Access-Token

# 管理员标识
VITE_GLOB_APP_SHORT_NAME = JetLinks_admin

# 是否在开发环境开启 https 和 http2（开启后将大幅优化首次启动时加载速度）
VITE_USE_HTTPS = false

```

## 运行

[pnpm](https://www.pnpm.cn/installation)安装

```shell
# 安装依赖
pnpm install

# 运行
pnpm dev
```

## 依赖包

### @jetlinks/vite

vite相关配置
在项目根目录 vite.config.ts 文件

#### createViteConfig


### @jetlinks/tsconfig

tsconfig相关配置

### @jetlinks/components

通用业务组件
通用业务组件在main.ts中已经全局注册，无需引入，直接使用

#### AMap(地图)
<a id="a_map"></a>
对 [vue-amap](https://vue-amap.guyixi.cn/) 进行了封装，兼容vue-amap [api](https://vue-amap.guyixi.cn/zh-cn/base/amap.html)

``` html
<template>
    <div style="width: 100%; height: 300px">
        <init-Amap
            @dragstart="mapClick"
            mapStyle="dark"
        >
            <el-amap-marker
            :position="[0,0]"
            />
        </init-Amap>
    </div>
</template>

<script setup lang="ts">
const mapClick = (e: any) => {
  console.log(e)
}
</script>
```

#### BadgeStatus(状态标签)

``` html
<template>
    <BadgeStatus
        :status="status"
        :text="status ? '正常' : '禁用'"
        :statusNames="{
            1: 'success',
            0: 'error',
        }"
    ></BadgeStatus>
</template>

<script setup lang="ts">
const status = ref(1)
</script>
```
##### api
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 自定义文本 | string | - |
| status | 自定义状态 | string、number | - |
| [statusNames](#BadgeStatus_statusNames) | 状态对应的名字 | object | { 'success': 'success','warning': 'warning',  'error': 'error',  'default': 'default' } |

<a id="BadgeStatus_statusNames"></a> 
##### statusNames可设置其他值
``` javascript
{
  //告警颜色
  'level1': '229, 0,  18',
  'level2': '255, 148,  87',
  'level3': '250, 189,  71',
  'level4': '153, 153, 153',
  'level5': '196, 196,  196'
}
```

#### FullPage(填充页面)

将剩下的页面填充

``` html
<template>
    <FullPage>
        <div class="container">
            <div class="left">
                left    
            </div>
            <div class="right">
                right
            </div>
        </div>
    </FullPage>
</template>

```


#### GeoComponent(地图组件)

地图组件二次封装了[Amap地图](#a_map)

``` html
<template>
    <div style="width: 200px;">
        <GeoComponent
            v-model:point="myValue"
            @change="onChange"
            v-bind="mapProps"
        />
    </div>

</template>
<script lang="ts" setup>

const myValue = ref('106.534144,29.519712')
const mapProps = ref({
    zoom: 80,
    center: [106.534144,29.519712],
    securityJsCode: '1e380e97bc94f06b63b9a2f76cc6079d' //安全密钥需要申请
})
const onChange = (e: string) => {
    console.log(2, e)
}
</script>
```
##### api
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:point | 点位数据 | string | - |
| [v-bind](#GeoComponent_v-bind) | 其他属性 | object | - |
| onChange | 点位数据改变时触发 | function | value: string |

<a id="GeoComponent_v-bind"></a> 
##### 其他属性
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| zoom | 点位数据 | number | - |
| center | 中心点 | array | - |
| securityJsCode | [安全密钥](https://lbs.amap.com/api/javascript-api-v2/prerequisites)(服务平台:Web端(JS API)) | string | - |

> 安全密钥securityJsCode要和地图的Key配合使用，地图Key在系统设置里配置


#### PermissionButton(权限按钮)
按钮权限组件支持antdv的[Button](https://www.antdv.com/components/button-cn#api)组件全部api，同时新增了按钮权限以及二次确认等功能

``` html
<template>
    <PermissionButton
      type="primary"
      :hasPermission="true"
      :tooltip="{ title: '新增' }"      
      :popConfirm="{
        title: `确定要新增吗？`,
        onConfirm: () => {
          console.log('新增')
        },
      }"
    >
      新增
    </PermissionButton>
</template>

```
##### 新增api
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tooltip | 文字提示[相关api](https://www.antdv.com/components/tooltip-cn) | object:{ title: '' } | - |
| popConfirm | 气泡确认框[相关api](https://www.antdv.com/components/popconfirm-cn#api) | object:{ title: '', onConfirm: () => {},} | - |
| hasPermission | 权限控制 | boolean | true |


#### ValueItem

``` html
<template>
    <ValueItem
        v-model:modelValue="modelValue"
        itemType="int"
        style="width: 200px"
        placeholder="请输入"
    ></ValueItem>
    <ValueItem
        v-model:modelValue="modelValue"
        itemType="date"
        valueFormat="YYYY-MM-DD HH:mm:ss"
        style="width: 200px"
        @change="onChange"
    ></ValueItem>
    <ValueItem
        v-model:modelValue="modelValue"
        itemType="enum"
        style="width: 200px"
        mode="multiple"
        :options="[
        {
            value: '11111',
            label: '11111',
        },
        {
            value: '22222',
            label: '22222',
        },
        ]"
        placeholder="请选择"
        @change="onChange"
    ></ValueItem>
    <ValueItem
        v-model:modelValue="modelValue"
        itemType="geoPoint"
        style="width: 200px"
        placeholder="请输入"
        v-bind="mapProps"
    ></ValueItem>
</template>
<script lang="ts" setup>
const modelValue = ref(undefined)
const mapProps = ref({
    zoom: 12,
    center: [106.534144, 29.519712],
    securityJsCode: '1e380e97bc94f06b63b9a2f76cc6079d',
})
const onChange = (e: string) => {
    console.log(2, e)
}
</script>
```
##### api

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:modelValue | 输入框内容 | string | - |
| itemType | 组件类型 | int、long、float、double、string、array、password、enum、boolean、date、object、geoPoint、file | string |
| placeholder | 输入框提示语 | string | - |
| mode | 多选框 | multiple、tags、combobox | ' ' |
| options | 下拉选择框下拉数据 | array | - |
| valueFormat | 格式化 | string | YYYY-MM-DD HH:mm:ss |
| action | 上传的地址 | `string|(file) => Promise` | - |
| headers | 设置上传的请求头部 | object | {'X-Access-Token':'登录时的token'} |
| onChange | 数据改变时触发 | function | value: string |
| [v-bind](#GeoComponent_v-bind) | 其他属性 | object | - |



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

