# jetlinks-project-ui-template


<a id=".env.development"></a>
## .env.development
``` shell
# public path
VITE_PUBLIC_PATH = /

# 代理标识
VITE_APP_BASE_API = /api

# 代理配置
VITE_PROXY = [["/api","http://192.168.33.46:8844"]]

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

使用pnpm命令运行，安装[pnpm](https://www.pnpm.cn/installation)

```shell
# 安装依赖
pnpm install

# 运行
pnpm dev
```

## 依赖包

### @jetlinks-web/vite

vite相关配置
在项目根目录 vite.config.ts 文件

#### createViteConfig


### @jetlinks-web/tsconfig

tsconfig相关配置

### @jetlinks-web/components

通用业务组件在`main.ts`中已经全局注册，无需引入，直接使用

#### AMap(地图)
<a id="a_map"></a>对 [vue-amap](https://vue-amap.guyixi.cn/) 进行了封装，相关[api](https://vue-amap.guyixi.cn/zh-cn/base/amap.html)

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
##### statusNames设置其他值
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
| headers | 设置上传的请求头部 | object | {'X-Access-Token(默认[VITE_TOKEN_KEY](#.env.development))':'默认登录时的token'} |
| onChange | 数据改变时触发 | function | value: string |
| [v-bind](#GeoComponent_v-bind) | 其他属性 | object | - |



### @jetlinks-web/constants

常量

#### 常用
有 `TOKEN_KEY`、`BASE_API`，分别是从开发环境的`VITE_TOKEN_KEY`和`VITE_APP_BASE_API`中获取，对应变量在项目文件[.env.development](#.env.development)自行配置

#### 其他 
`ContentTypeEnum` ContentType相关配置 
``` javascript
{
    JSON: 'application/json;charset=UTF-8',
    FORM_QS: 'application/x-www-form-urlencoded;charset=UTF-8',
    FORM: 'multipart/form-data;charset=UTF-8'
}
```

#### 使用
``` javascript
import { TOKEN_KEY, BASE_API, ContentTypeEnum } from '@jetlinks-web/constants'

console.log(TOKEN_KEY, BASE_API); //X-Access-Token, /api 
console.log(ContentTypeEnum); 
// {
//     "JSON": "application/json;charset=UTF-8",
//     "FORM_QS": "application/x-www-form-urlencoded;charset=UTF-8",
//     "FORM": "multipart/form-data;charset=UTF-8"
// }
```



### @jetlinks-web/core

基本核心库，包含 axios，websocket

#### axios
对axios请求进行封装，异常拦截处理，支持`GET`、`PUT`、`PATCH`、`DELETE`等方式请求
##### 新增
+ `postParams`方法：同时支持query string和request body传参
+ `getStream`方法：get流式数据传参，`responseType: 'arraybuffer'`
+ `postStream`方法：post流式数据传参，`responseType: 'arraybuffer'`

##### 使用
###### get
``` javascript
import { request } from '@jetlinks-web/core'
/**
 * 发送 GET 请求
 * @param url 请求的 URL 地址
 * @param params 请求的参数(query string)，默认值为 undefined
 * @param ext 其他额外的请求配置
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const logout = () => request.get('/user-token/reset')
```
###### post
``` javascript
import { request } from '@jetlinks-web/core'
/**
 * 发送 POST 请求
 * @param url 请求的 URL 地址
 * @param data 请求的参数(request body)，默认值为 undefined
 * @param ext 其他额外的请求配置
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const login = (data: any) => request.post('/authorize/login', data)
```

###### postParams
``` javascript
import { request } from '@jetlinks-web/core'
/**
 * 发送带有参数的 POST 请求
 * @param url 请求的 URL 地址
 * @param data 请求的参数(request body)，默认值为 undefined
 * @param params 请求的参数(query string)，默认为空对象 {}
 * @param ext 其他额外的请求配置
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const user = (data: any, params:any) => 
    request.postParams(
        '/user', 
        data, 
        params,
        {
            // 自定义请求头
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            // `responseType` 表示浏览器将要响应的数据类型
            // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
            // 浏览器专属：'blob'
            responseType: 'json', // 默认值
        }
    )

```
###### put
``` javascript
import { request } from '@jetlinks-web/core'

/**
 * 发送 PUT 请求
 * @param url 请求的 URL 地址
 * @param data 请求的参数(request body)，默认值为 undefined
 * @param ext 其他额外的请求配置
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const userPut = (data: any) => request.put('/user/put', data)

/**
 * 发送 PATCH 请求
 * @param url 请求的 URL 地址
 * @param data 请求的参数(request body)，默认值为 undefined
 * @param ext 其他额外的请求配置
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const userPatch = (data: any) => request.patch('/user/patch', data)
```
###### remove
``` javascript
import { request } from '@jetlinks-web/core'
/**
 * 发送 DELETE 请求
 * @param url 请求的 URL 地址
 * @param params 请求的参数(query string)，默认值为 undefined
 * @param ext 其他额外的请求配置
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const userRemove = (data: any) => request.remove('/user/remove', data)
```
###### getStream
``` javascript
import { request } from '@jetlinks-web/core'
/**
 * 获取流式数据的 GET 请求
 * @param url 请求的 URL 地址
 * @param params 请求的参数(query string)，默认值为 undefined
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const userGetStream = (params: any) => request.getStream('/user/get/stream', params)

```
###### postStream
``` javascript
import { request } from '@jetlinks-web/core'
/**
 * 发送包含流式数据的 POST 请求
 * @param url 请求的 URL 地址
 * @param data 请求的参数(request body)
 * @param params 请求的参数(query string)
 * @returns 返回一个 Promise 对象，用于异步获取请求结果
 */
export const userPostStream = (data: any, params: any) => 
    request.postStream('/user/post/stream', data, params)
```

#### websocket

封装了一套可靠的 WebSocket 连接和消息订阅，并提供了一些常用的功能函数。

- 实现了心跳功能，定时向服务器发送心跳消息。
- 实现了重启功能，当 WebSocket 连接断开时，自动重新连接，并根据断开次数和规则确定重启的时间间隔。
- 提供了初始化 WebSocket 的函数和获取 WebSocket 的函数，用于创建和管理 WebSocket 连接，并返回一个 Observable 对象用于订阅服务器推送的消息。
- 实现了处理 WebSocket 的事件回调，包括连接打开、连接错误、接收消息和连接关闭等。
- 提供了关闭 WebSocket 的函数，用于手动关闭 WebSocket 连接。
- 在页面关闭前，自动关闭 WebSocket 连接。

##### 使用
``` javascript
import { initWebSocket, getWebSocket } from '@jetlinks-web/core'
import { map } from 'rxjs/operators';
import { ref } from 'vue'

/**
 * 初始化 
 * @param url websocket地址
 */
initWebSocket('ws://localhost:8080/ws') 

/**
 * 获取 WebSocket 连接并订阅指定主题的数据
 * @param id 订阅 ID
 * @param topic 订阅主题 官方协议topic主题说明 https://hanta.yuque.com/px7kg1/yfac2l/sr0metyagzmhbtm7
 * @param parameter 订阅参数（可选）
 * @returns Observable对象，用于订阅接收数据
 */
const wsRef = ref<any>()
wsRef.value = getWebSocket(
    `operations-xxx-Id`,
    `/dashboard/xxx/topic`,
    {
        type: 'memory',
        interval: '2s',
        agg: 'avg',
    },
)
    ?.pipe(map((res: any) => res.payload))
    .subscribe((payload: any) => {
        // 处理接收到的数据
        console.log(payload)
    });

wsRef.value?.unsubscribe?.() // 取消订阅

```
> 官方协议topic主题说明 https://hanta.yuque.com/px7kg1/yfac2l/sr0metyagzmhbtm7

### @jetlinks-web/hooks

包含常用的 `useRequest` `useRouterParams` `useWebSocket`

#### useRequest
简化处理异步请求的逻辑，提供了方便的数据响应和错误处理。

``` html
<template>
  <div>
    <p v-if="loading">加载中...</p>
    <ul v-if="data">
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
    <button @click="fetchData">获取数据</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRequest } from '@jetlinks-web/hooks'
import { request } from '@jetlinks-web/core';

interface Item {
  id: number;
  name: string;
}

const data = ref<Item[]>([]);

// 使用 useRequest Hook 来管理异步请求和加载状态
/**
 * 处理异步请求
 * @param {Function} request 异步请求函数
 * @param {Object} options 请求选项，默认值 
 * {   immediate: true,  //主动触发
 *     formatName: 'result' 
 * }
 * @returns {Object} 包含响应式数据和方法的对象 
 * { 
 *  data, //响应式数据
 *  loading, //响应式状态
 *  run //执行函数，手动运行
 * }
 */
const { run, loading } = useRequest<Item[]>(queryData, {
  onSuccess,
  onError,
  immediate: false, //是否主动触发
});

// 异步获取数据的函数
async function queryData(id:string): Promise<Item[]> {
  const response = await request.get(`https://api.example.com/data?id=${id}`);
  return response.data.items;
}


function fetchData() {
    // 手动运行run，在run中传参
    run('123_id')
    .then((result) => {
        data.value = result;
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        loading.value = false;
    });
}


// 请求成功的回调函数
function onSuccess(response: Item[]): void {
//   data.value = response;
}

// 请求失败的回调函数
function onError(error: Error): void {
  console.error(error);
}


// 默认主动触发run 请求结束之后直接拿到响应式的data数据
const { data: _data } = useRequest(fetchData)

</script>
```
##### useRouterParams

提供两个方法 `userRouterParams()`返回当前路由参数`{ params }` 和 `setParamsValue(code, name)` 设置当前路由参数
###### useRouterParams
``` javascript
import { useRouterParams } from '@jetlinks-web/hooks'
import { useMenuStore } from '@/store/menu'

const { jumpPage } = useMenuStore()
// setParamsValue在jumpPage跳转页面时使用
jumpPage(`system/Role/Detail`, {
    params: {
        id: '123',
    },
})

const routerParams = useRouterParams();

console.log(routerParams.params.value.id) // 123
```
###### setParamsValue
setParamsValue在jumpPage跳转页面时使用
``` javascript
import { router } from '@jetlinks-web/router'
import { setParamsValue } from '@jetlinks-web/hooks'

/**
 * 页面跳转
 * @param name 路由name
 * @param param1 {Object} 需要传递的参数
 */
const jumpPage = (name: string, { params, query }: { params?: Record<string, any>, query?: Record<string, any>}) => {
    if (hasMenu(name)) {
        router.push({ name, params, query })
        setParamsValue(name, params)
    } else {
        console.warn(`没有找到对应的页面: ${name}`)
    } 
}

```


### @jetlinks-web/router

通用路由配置

- `initRoute()`初始化路由
- `jumpLogin()`跳转登录页
- `createAuthRoute()`创建动态菜单
- `initRouteAssignStore()`获取子项目中的store

#### initRoute
在项目`main.ts`文件，初始化路由
``` javascript
import { createApp } from 'vue'
import App from './App.vue'
import { initRoute } from '@jetlinks-web/router'
import './style.css'

(async () => {
    const app = createApp(App)

    const router = initRoute() //初始化路由
    app.use(router)

    app.mount('#app')
})()
```

#### jumpLogin
跳转登录页，常用于退出登录或者token失效
``` javascript
import { jumpLogin } from '@jetlinks-web/router'

// 在需要跳转到登录页的地方调用 jumpLogin 函数
jumpLogin();
```
#### createAuthRoute
创建动态菜单
在`router\guard.ts`文件中使用

``` javascript
import { createAuthRoute, initRouteAssignStore } from '@jetlinks-web/router'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'
import { useSystemStore } from '@/store/system'
import { useAuthStore } from '@/store/auth'

async function setupRouter() {

    initRouteAssignStore({
        UserInfoStore: useUserStore(),
        MenuStore: useMenuStore(),
        SystemStore: useSystemStore(),
        AuthStore: useAuthStore()
    })

    createAuthRoute()
}

export { setupRouter }
```
##### initRouteAssignStore
获取子项目中的store，在`router\guard.ts`文件中使用
``` javascript
import { initRouteAssignStore } from '@jetlinks-web/router'


// 在需要初始化子项目中的 store 的地方调用 initRouteAssignStore 函数
const store = {
  UserInfoStore: { /* 子项目中的 UserInfoStore 对象 */ },
  MenuStore: { /* 子项目中的 MenuStore 对象 */ },
  SystemStore: { /* 子项目中的 SystemStore 对象 */ },
  AuthStore: { /* 子项目中的 AuthStore 对象 */ }
};

initRouteAssignStore(store);
```


### @jetlinks-web/utils

通用工具函数

#### getAMapUiPromise
动态加载高德地图UI库

``` javascript
import { getAMapUiPromise } from '@jetlinks-web/utils'

/**
 * 获取高德地图UI库的Promise
 * @param version 高德地图UI库的版本号，默认为 '1.0'
 * @returns 返回一个Promise，在高德地图UI库加载完成后执行回调
 */
getAMapUiPromise('1.1').then(() => {});

```

#### getAppConfigFileName
获取应用程序配置

``` javascript
/**
 * 获取应用程序配置文件名
 * @param env 环境变量对象，类型为 ENV
 * @returns 返回应用程序配置文件名
 */
const env = import.meta.env
const ENV_NAME = getAppConfigFileName(env)
```
#### getGlobalConfig
获取全局配置

``` javascript
/**
 * 获取全局配置对象
 * @param env 环境变量对象，类型为 ENV
 * @returns 返回全局配置对象，包含 apiUrl 属性
 */
const env = import.meta.env
const glob = getGlobalConfig(env)
```

#### buildScriptTag
构建 script 标签
``` javascript
/**
 * 构建 script 标签
 * @param src script 标签的 src 属性值
 * @returns 返回构建的 script 标签对象
 */
const protocol = window.location.protocol;
const script = buildScriptTag(`${protocol}//webapi.amap.com/ui/1.1/main-async.js`);
```
#### downloadFileByUrl
根据 URL 下载文件
``` javascript
/**
 * 根据 URL 下载文件
 * @param url 文件的 URL
 * @param name 下载文件的名称
 * @param type 下载文件的类型
 */
downloadFileByUrl('https://example.com/file.pdf', 'myFile', 'pdf');

```
#### encrypt
使用公钥对文本进行加密
``` javascript
import { encrypt } from '@jetlinks-web/utils'

/**
 * 使用公钥对文本进行加密
 * @param txt 要加密的文本
 * @param publicKey 公钥字符串
 * @returns 返回加密后的文本
 */
// 假设你有一个公钥
const publicKey = "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAMkQlL4vIvGzF7DQbM4y1zB9T\n" +
    "M7nXnRt3N6L0QIdXfEzj6DvZ1dnD+jZx85iN7DQo4uRlOx3uFOb7gU2yq7q5eXTh\n" +
    "BZdNfjK2wN5Sv0GnLsJkTcDc3l6Z6gI4y3g3k9P2mZ7D1fV5XzqRy2+3vugx2WcG\n" +
    "bQq8+5HgnjH1bCK1lwIDAQAB\n" +
    "-----END PUBLIC KEY-----"

// 调用 encrypt 函数加密文本
const encryptedText = encrypt("Hello World", publicKey)
console.log(encryptedText) // 输出加密后的文本
```

#### regular
常用正则表达式
- `isUrl`: 用于校验URL，匹配方法为 isUrl(path: string): boolean。
- `isEnglishOrNumber`: 用于校验只允许输入英文或数字，匹配方法为 isEnglishOrNumber(value: string): boolean。
- `isCronReg`: 用于校验cron表达式，匹配方法为 isCronReg(cron: string): boolean。
- `isEnglish`: 用于校验只允许输入英文，匹配方法为 isEnglish(value: string): boolean。
- `isChinese`: 用于校验只允许输入中文，匹配方法为 isChinese(value: string): boolean。
- `isTelephone`: 用于校验座机号码，匹配方法为 isTelephone(phone: string): boolean。
- `isCellphone`: 用于校验手机号码，匹配方法为 isCellphone(phone: string): boolean。
- `isIpReg`: 用于校验IP地址，匹配方法为 isIpReg(value: string): boolean。
- `isIpv6`: 用于校验IPv6地址，匹配方法为 isIpv6(value: string): boolean。
- `isDomain`: 用于校验域名，匹配方法为 isDomain(value: string): boolean。
- `isEmail`: 用于校验邮箱地址，匹配方法为 isEmail(value: string): boolean。
- `isPassword`: 用于校验密码强度，必须至少包含大小写英文和数字，匹配方法为 isPassword(value: string): boolean。
``` javascript
import { regular } from '@jetlinks-web/utils'

regular.isEmail('123@qq.com')
```

#### getImage
静态图片资源处理

``` javascript
import { getImage } from '@jetlinks-web/utils'

/**
 * 静态图片资源处理
 * @param path {String} 路径
 */
const imagePath = '/logo.png';
const imageUrl = getImage(imagePath);
console.log(imageUrl); // 输出完整的图片 URL
```
#### onlyMessage
单个message提示
``` javascript
import { onlyMessage } from '@jetlinks-web/utils'

/**
 * 单个message提示，根据类型只提示一次
 * @param msg 消息内容
 * @param type 消息类型，可选值为 'success' | 'error' | 'warning'，默认为 'success'
 */
const successMessage = '操作成功';
const errorMessage = '发生错误';

onlyMessage(successMessage); // 显示默认类型为 'success' 的消息提示
onlyMessage(errorMessage, 'error'); // 显示类型为 'error' 的消息提示
```
#### getSlot
获取插槽内容
``` javascript
import { getSlot } from '@jetlinks-web/utils'

/**
 * 获取插槽内容
 * @param slots 插槽对象
 * @param props 属性对象
 * @param prop 插槽名称，默认为 'default'
 * @returns 插槽内容的类型为 T，如果插槽设置为 false，则返回 false
 */
// 假设有一个插槽对象 slots 和一个属性对象 props
const slots = { default: '插槽内容' };
const props = { default: '默认属性值' };

const slotContent = getSlot(slots, props);
console.log(slotContent); // 输出 '插槽内容'

const nonExistentSlotContent = getSlot(slots, props, 'nonExistentSlot');
console.log(nonExistentSlotContent); // 输出 false，因为指定的插槽不存在

const falseSlotContent = getSlot(slots, props, 'default');
console.log(falseSlotContent); // 输出 false，因为指定的插槽被设置为 false

```
#### getSlotVNode
获取插槽内容的 VNode
``` javascript
import { getSlotVNode } from '@jetlinks-web/utils'

/**
 * 获取插槽内容的 VNode
 * @param slots 插槽对象
 * @param props 属性对象
 * @param prop 插槽名称，默认为 'default'
 * @returns VNode 的类型为 T，如果插槽设置为 false，则返回 false
 */
// 假设有一个插槽对象 slots 和一个属性对象 props
const slots = { default: () => '插槽内容' };
const props = { default: '默认属性值' };

const slotVNode = getSlotVNode(slots, props);
console.log(slotVNode); // 输出 '插槽内容' 的 VNode

const nonExistentSlotVNode = getSlotVNode(slots, props, 'nonExistentSlot');
console.log(nonExistentSlotVNode); // 输出 false，因为指定的插槽不存在

const falseSlotVNode = getSlotVNode(slots, props, 'default');
console.log(falseSlotVNode); // 输出 false，因为指定的插槽被设置为 false
```
#### randomString
生成指定长度的随机字符串
``` javascript
import { randomString } from '@jetlinks-web/utils'

/**
 * 生成指定长度的随机字符串
 * @param length 长度，默认为 32
 * @returns 随机字符串
 */
const randomStr = randomString(10);
console.log(randomStr); // 输出一个长度为 10 的随机字符串
```
#### getBase64ByImg
将图片转换为 base64 格式
``` javascript
import { getBase64ByImg, onlyMessage } from '@jetlinks-web/utils'
/**
 * 将图片转换为 base64 格式
 * @param img 图片文件
 * @param callback 转换完成后的回调函数，接收 base64 URL 作为参数
 */
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  getBase64ByImg(file, (base64Url) => {
    console.log(base64Url); // 输出转换后的 base64 URL
  });
});

//或者
const beforeUpload = (file: any) => {
  const types = (props.types || []) as Array<string>
  const inType = types.includes(file.type)
  const maxSize = (props.size || 2) as number // 文件最大多少兆
  const isMaxSize = (file.size / 1024 / 1024) < maxSize

  if (!inType) {
    onlyMessage('请上传正确格式的图片', 'error')
  }

  if (!isMaxSize) {
    onlyMessage(`图片大小必须小于${maxSize}M`, 'error');
  }
  getBase64ByImg(file, base64Url => {
    console.log(base64Url); // 输出转换后的 base64 URL
  })
  return false
}

```
