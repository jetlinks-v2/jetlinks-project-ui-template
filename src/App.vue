<template>
  <ConfigProvider :locale='zhCN'>
    <router-view />
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'jetlinks-ui-components'
import zhCN from 'jetlinks-ui-components/es/locale/zh_CN';
import theme from '../configs/theme'
ConfigProvider.config({
  theme: theme
})
</script>
<style scoped>

</style>
