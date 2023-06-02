<template>
  <page-container>
    <FullPage>
      <div class="department-container">
        <div class="left">
          <LeftTree @change="(id) => (departmentId = id)" />
        </div>
        <div class="right">
          <User :parentId="departmentId" />
        </div>
      </div>
    </FullPage>
  </page-container>
</template>

<script setup lang="ts" name="Department">
import LeftTree from './components/LeftTree.vue'
import User from './user/index.vue'

const departmentId = ref<string>('')
</script>

<style lang="less" scoped>

.department-container {
    display: flex;

    .left {
      width: 300px;
    }

    .right {
      flex: 1;
    }
  }
</style>
