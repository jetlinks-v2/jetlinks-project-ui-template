<template>
  <page-container>
    <j-search :columns="columns" target="category" @search="onSearch" />
    <FullPage>
      <j-pro-table
        ref="tableRef"
        :columns="columns"
        :request="getRoleList_api"
        model="TABLE"
        :params="params"
        :defaultParams="{
          sorts: [
            { name: 'createTime', order: 'desc' },
            { name: 'id', order: 'desc' },
          ],
        }"
      >
        <template #headerTitle>
          <PermissionButton
            type="primary"
            :hasPermission="`${permission}:add`"
            @click="dialogVisible = true"
          >
            <AIcon type="PlusOutlined" />新增
          </PermissionButton>
        </template>

        <template #action="slotProps">
          <j-space :size="16">
            <PermissionButton
              :hasPermission="`${permission}:update`"
              type="link"
              :tooltip="{
                title: '编辑',
              }"
              @click="
                jumpPage(`system/Role/Detail`, {
                  params: { id: slotProps.id },
                })
              "
              style="padding: 0"
            >
              <AIcon type="EditOutlined" />
            </PermissionButton>
            <PermissionButton
              type="link"
              :hasPermission="`${permission}:delete`"
              :tooltip="{ title: '删除' }"
              danger
              :popConfirm="{
                title: `确定要删除吗`,
                onConfirm: () => clickDel(slotProps),
              }"
              style="padding: 0"
            >
              <AIcon type="DeleteOutlined" />
            </PermissionButton>
          </j-space>
        </template>
      </j-pro-table>
    </FullPage>

    <AddDialog v-if="dialogVisible" @close="dialogVisible = false" @save="onSave" />
  </page-container>
</template>

<script setup lang="ts" name="Role">
import AddDialog from './components/AddDialog/index.vue'
import { getRoleList_api, delRole_api } from '@/api/role'
import { useMenuStore } from '@/store/menu'
import { useRoute } from 'vue-router'
import { columns } from './util'
import { onlyMessage } from '@jetlinks-web/utils'

const permission = 'system/Role'
const { jumpPage } = useMenuStore()

const isSave = !!useRoute()?.query?.save

const params = ref({})
// 表格
const tableRef = ref<Record<string, any>>()
const dialogVisible = ref(isSave)

// 删除数据
const clickDel = (row: any) => {
  delRole_api(row.id).then((resp: any) => {
    if (resp.status === 200) {
      tableRef.value?.reload()
      onlyMessage('操作成功!')
    }
  })
}

// 搜索
const onSearch = (e: any) => {
  params.value = {
    terms: e,
  }
}

const onSave = () => {
    dialogVisible.value = false
    tableRef.value?.reload()
}
</script>
