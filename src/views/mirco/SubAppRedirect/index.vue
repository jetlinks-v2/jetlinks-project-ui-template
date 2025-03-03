<template>
  <BasicLayoutPage>
    <template v-if="isBuiltInApp">
      <div class="micro-app-container" >
        <a-spin :spinning="loading" size="large" wrapperClassName="micro-app-spin">
          <micro-app
            iframe
            keep-router-state
            router-mode='pure'
            class="micro-app-content"
            :key="appName"
            :name="appName"
            :url="pageData.baseUrl"
            :data="myData"
            :defaultPage="defaultPage"
            :disableScopecss="true"
            @created="handleCreate"
            @beforemount="handleBeforeMount"
            @mounted="handleMount"
            @unmount="handleUnmount"
            @error="handleError"
            @datachange="handleDataChange"
          ></micro-app>
        </a-spin>
      </div>
    </template>
    <iframe
      v-else
      class="iframe-content"
      :key="defaultPage"
      :src="pageData.baseUrl + defaultPage"
      scrolling="yes"
      frameBorder="0"
      style="width: 100%; height: 100%"
    />
  </BasicLayoutPage>
</template>
<script setup name="Micro">
import { useRoute } from 'vue-router'
import { getToken } from "@jetlinks-web/utils";
import { useMenuStore } from '@/store'
import { toRefs } from 'vue'
import microApp from '@micro-zoe/micro-app'
import { BasicLayoutPage } from "@/layout"
import { getAppId } from '@/utils/comm'
import { isNumber } from 'lodash-es'

// const menuStory = useMenuStore()
// const route = useRoute()
// const router = useRouter()
// const loading = ref(true)
// const pageData = reactive({
//   baseUrl: ''
// })
//
// const { baseRoute, data, port } = toRefs(route.query)
//
// const defaultPage = ref()
//
// const myData = ref({})
// const appName = ref()
// const disableScopecss = ref(true)
// const appInfo = ref({
//   timestamp: 0
// })
// const oauthVisible = ref(false)
// const isBuiltInApp = ref(true)
//
// const getCurrentRoute = (array, path) => {
//   let _redirect = path
//   array.some(item => {
//     if (item.path === path) {
//       if (item.redirect && item.children?.length) {
//         _redirect = getCurrentRoute(item.children, item.redirect)
//       }
//       return true
//     } else if (item.children) {
//       const res = getCurrentRoute(item.children, path)
//       if (res) {
//         _redirect = res
//         return true
//       }
//     }
//   })
//
//   return _redirect
// }
//
// const initPage = async () => {
//   const appId = getAppId()
//   if (appInfo.value.timestamp !== getTimeStamp()) {
//     appInfo.value = await getAppInfo(appId)
//     appInfo.value.timestamp = getTimeStamp()
//   }
//   isBuiltInApp.value = !appInfo.value.disableScopecss
//
//   const _name = isNumber(Number(appId)) ? 'app_' + appId : appId
//   const isRouteHash = !appInfo.value.page || appInfo.value.page?.routeType === 'hash'
//
//   let _url = getCurrentRoute(menuStory.siderMenus, route.path)
//
//   if (route.path !==_url) {
//     router.push(_url)
//     return
//   } else {
//     if (!isBuiltInApp.value) { // 外部应用
//       const hasQuestion = _url.includes('?')
//       const timestamp = `timestamp=${getTimeStamp()}`
//       _url += `${hasQuestion ? '&' : '?'}${timestamp}`
//     }
//
//     const defaultPageUrl = _url.replace('/application', '')
//     disableScopecss.value = appInfo.value.disableScopecss
//     appName.value = _name
//     defaultPage.value = isRouteHash ? '/#' + defaultPageUrl : defaultPageUrl
//
//     pageData.baseUrl = appInfo.value.url
//   }
//
//
//   if (!loading.value && isBuiltInApp.value) {
//     setTimeout(() => {
//       microApp.router.push({ name: _name, path: defaultPage.value })
//     }, 300)
//   }
//
//   myData.value = {
//     token: getToken(),
//     layoutType: menuStory.menuMode,
//     appId: appId,
//     ...JSON.parse(data || '{}')
//   }
//
// }
//
// const handleCreate = ()=>{console.log("【基座】appView 创建了");}
// const handleBeforeMount = ()=>{console.log("【基座】appView 即将被渲染");}
// const handleMount = ()=>{
//   console.log("【基座】appView 已经渲染完成");
//   setTimeout(() => {
//     loading.value = false
//   }, 300)
//
//   const appId = getAppId()
//   myData.value = {
//     token: getToken(),
//     layoutType: menuStory.menuMode,
//     appId: appId,
//     ...JSON.parse(data || '{}')
//   }
//   // setTimeout(() => {
//   //   microAppData.value = { msg: "基座修改数据，触发子应用的监听函数" };
//   // }, 2000);
// }
// const handleUnmount = ()=>{console.log("【基座】appView 卸载了");}
// const handleError = (e)=>{
//   console.log("【基座】appView 加载出错了", e);
// }
// const handleDataChange = (e)=>{
//   console.log("【基座】收到来自子应用 appView 的数据:", e.detail.data);
//   const baseData = e.detail.data
//
//   if (baseData.hasOwnProperty('oauth2')) { // 打开权限认证
//     openAuthModal()
//   }
// }
//
// const openAuthModal = () => {
//   oauthVisible.value = true
// }
//
// watch(() => route.path, (val, oldValue) => {
//   if (!route.path.includes('undefined') && val !== oldValue) {
//     initPage()
//   }
// }, { immediate:true, deep: true})

</script>

<style scoped lang="less">
.micro-app-container, .micro-app-content {
  width: 100%;
  height: 100%;

  .micro-app-spin {
    height: 100%;
    width: 100%;
    > div {
      height: 100%;
      width: 100%;
    }
  }
  :deep(.ant-spin-container) {
    height: 100%;
  }
}
</style>
