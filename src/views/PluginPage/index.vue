<template>
  <j-page-container>
    <div class="plugin-page-contain">
      <render-components :value="render"></render-components>
    </div>
  </j-page-container>
</template>

<script setup name="PluginPage">
import RenderComponents from "@/components/RenderComponents";
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const { pluginContext } = storeToRefs(userStore)
const route = useRoute()

const render = computed(() => {
  const renderArr = pluginContext.value[route.meta.parentCode] || []
  const item = renderArr.find(item => item.page.code === route.meta.pluginPageCode) || {}
  console.log(renderArr, item, route.meta.pluginPageCode)
  return item.render
})

</script>

<style scoped>
.plugin-page-contain {
  padding: 24px;
  background-color: #fff;
}
</style>
