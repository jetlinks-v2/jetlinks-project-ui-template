<template>
  <div style="height: 300px">
    <component :is="components" />
  </div>
</template>

<script setup name="Demo">
import {loadRemoteModule} from "@/utils/comm";

const components = ref()

onMounted(async () => {
  const mod = await loadRemoteModule('http://localhost:8081/plugin-components.mjs')

  if (mod) {
    components.value = window.Plugins?.InitDevice
  }
})
</script>

<style scoped>

</style>
