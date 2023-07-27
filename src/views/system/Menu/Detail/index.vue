<template>
  <page-container>
    <div class="menu-detail-container">
      <j-tabs v-model:activeKey="activeKey">
        <j-tab-pane key="basic" tab="基本信息">
          <BasicInfo :value="initData" />
        </j-tab-pane>
        <j-tab-pane key="button" tab="按钮管理">
          <ButtonMange :value="initData" @refresh="onRefresh" />
        </j-tab-pane>
      </j-tabs>
    </div>
  </page-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import BasicInfo from './BasicInfo/index.vue'
import ButtonMange from './ButtonMange/index.vue'
import { getMenuInfo } from '@/api/menu'

const route = useRoute()
const activeKey = ref('basic')
const initData = ref<any>({})

const handleSearch = (id: string) => {
  getMenuInfo(id).then((resp: any) => {
    if (resp.success) {
      initData.value = resp.result
    }
  })
}

watch(
  () => route.params.id,
  (newValue) => {
    if (newValue && newValue !== ':id') {
      handleSearch(newValue as string)
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

const onRefresh = () => {
  handleSearch(route.params.id as string)
}
</script>

<style lang="less" scoped>
.menu-detail-container {
  :deep(.ant-tabs-nav) {
    background-color: #fff;
    padding-left: 24px;
    margin-bottom: 0;
  }
  .ant-tabs-tabpane {
    background-color: #f0f2f5;
    padding-top: 24px;
  }
}
</style>
