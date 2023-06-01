<template>
  <page-container>
    <div>
      {{ route.name }}
    </div>
    <permission-button
      type="primary"
      hasPermission="DataCollect/Channel:add1"
      @click="() => {console.log('caozuo')}"
    >
      <template #icon>
        123
      </template>
      测试
    </permission-button>

    <permission-button
      type="primary"
      :tooltip="{
        title: '测试'
      }"
    >
      <template #button>
        button
      </template>
    </permission-button>
  </page-container>
</template>

<script setup name="Demo" lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>

</style>
