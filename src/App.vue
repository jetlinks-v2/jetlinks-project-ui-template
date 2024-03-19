<template>
  <ConfigProvider :locale="zhCN">
    <router-view/>
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from '@jetlinks-web/components'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import theme from '../configs/theme'
import { useAuthStore } from '@/store/auth';
import { ComponentsEnum } from '@jetlinks-web/constants'

ConfigProvider.config({
  theme: theme,
})

// 为公共hooks提供权限校验方法
const { hasPermission } = useAuthStore();
provide(ComponentsEnum.Permission, hasPermission)
</script>
<style scoped></style>
