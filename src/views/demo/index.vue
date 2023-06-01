<template>
  <page-container>
    <div>
      {{ route.name }}
    </div>
  </page-container>
</template>

<script setup name="Demo" lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>

</style>
