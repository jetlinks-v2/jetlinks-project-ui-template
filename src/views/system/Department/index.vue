<template>
  <page-container>
    <FullPage>
      <div class="department-container">
        <div class="left">
          <LeftTree @change="onChange" />
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

const onChange = (id: string) => {
  departmentId.value = id
}
</script>

<style lang="less" scoped>
.department-container {
  display: flex;
  padding: 24px;

  .left {
    width: 300px;
  }

  .right {
    flex: 1;
  }
}
</style>
