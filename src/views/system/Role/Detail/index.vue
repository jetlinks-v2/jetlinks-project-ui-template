<template>
    <page-container>
        <FullPage>
          <div class="details-container">
            <j-tabs v-model:activeKey="activeKey" type="card">
              <j-tab-pane key="1" tab="权限分配"><Permission /></j-tab-pane>
              <j-tab-pane key="2" tab="用户管理"><User /></j-tab-pane>
            </j-tabs>
          </div>
        </FullPage>
    </page-container>
</template>

<script setup lang="ts" name="RoleDetail">
import Permission from './Permission/index.vue';
import User from './User/index.vue';
import FullPage from "@/layout/FullPage.vue";

const activeKey = ref('1');
</script>

<style lang="less" scoped>
.details-container {
    //:deep(.ant-tabs-nav-wrap) {
    //    background-color: #fff;
    //    padding-left: 24px;
    //}
  padding: 24px;
}
</style>
