<template>
  <ConfigProvider :locale="zhCN">
    <router-view/>
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from '@jetlinks-web/components'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import theme from '../configs/theme'
import { useAuthStore, useMenuStore, useUserStore } from '@/store';
import { ComponentsEnum } from '@jetlinks-web/constants'
import {initPackages} from "@/package";
import {setToken} from "@jetlinks-web/utils";

const route = useRoute()

ConfigProvider.config({
  theme: theme,
})

// 为公共hooks提供权限校验方法
const { hasPermission } = useAuthStore();
const { jumpPage } = useMenuStore()
provide(ComponentsEnum.Permission, { hasPermission })
provide('app-content-tool', {
  jumpPage,
  store: {
    useUserStore
  }
})

initPackages()

watch(() => JSON.stringify(route.query || {}), () => {
  if (route.query.token) {
    setToken(route.query.token as string)
  }
}, { immediate: true })

</script>
<style scoped></style>
