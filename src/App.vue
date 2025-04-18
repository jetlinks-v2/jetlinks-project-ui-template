<template>
  <ConfigProvider
      :locale="language[systemStore.language]"
      :componentsLocale="componentsLocale[systemStore.language]"
      :IconConfig="{
      scriptUrl: '//at.alicdn.com/t/c/font_4035907_yy50diag6g8.js'
    }"
  >
    <router-view/>
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from '@jetlinks-web/components'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUs from 'ant-design-vue/es/locale/en_US'
import componentsZhCN from '@jetlinks-web/components/es/locale/zh-CN'
import componentsEnUS from '@jetlinks-web/components/es/locale/en-US'
import theme from '../configs/theme'
import { useAuthStore, useSystemStore } from '@/store';
import { usePermissionContext } from '@jetlinks-web/hooks'
import {initPackages} from "@/package";
import { setToken} from "@jetlinks-web/utils";
import {BASE_API, LOCAL_BASE_API} from '@jetlinks-web/constants'

const route = useRoute()

const systemStore = useSystemStore()

const language = {
  en: enUs,
  zh: zhCN
}

const componentsLocale = {
  en: componentsEnUS,
  zh: componentsZhCN
}
// 为公共hooks提供权限校验方法
const { hasPermission } = useAuthStore();

usePermissionContext({ hasPermission })

initPackages()

if (import.meta.env.DEV) {
  localStorage.setItem(LOCAL_BASE_API, BASE_API)
}

ConfigProvider.config({
  theme: theme,
})


watch(() => JSON.stringify(route.query || {}), () => {
  if (route.query.token) {
    setToken(route.query.token as string)
  }
}, { immediate: true })

window.addEventListener('vite:preloadError', (event) => {
  console.error('资源版本不对，请清除浏览器缓存')
})

</script>
<style scoped></style>
