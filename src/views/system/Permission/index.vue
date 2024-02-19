<template>
  <page-container>
    <j-search
      :columns="columns"
      target="system-permission"
      @search="handleSearch"
    />
    <FullPage>
      <j-pro-table
        ref="tableRef"
        :columns="columns"
        :request="getPermission_api"
        model="TABLE"
        :params="params"
        :defaultParams="{
          sorts: [{ name: 'id', order: 'asc' }],
        }"
      >
        <template #headerTitle>
          <j-space>
            <PermissionButton
              type="primary"
              :hasPermission="`${permission}:add`"
              @click="openDialog()"
            >
              <AIcon type="PlusOutlined" />新增
            </PermissionButton>
            <j-dropdown trigger="hover">
              <j-button>批量操作</j-button>
              <template #overlay>
                <j-menu>
                  <j-menu-item>
                    <j-upload
                      name="file"
                      action="#"
                      accept=".json"
                      :showUploadList="false"
                      :before-upload="clickImport"
                      :disabled="!hasPerm"
                    >
                      <PermissionButton :hasPermission="`${permission}:import`">
                        导入
                      </PermissionButton>
                    </j-upload>
                  </j-menu-item>
                  <j-menu-item>
                    <PermissionButton
                      :hasPermission="`${permission}:export`"
                      :popConfirm="{
                        title: `确认导出？`,
                        onConfirm: () => clickExport(),
                      }"
                    >
                      导出
                    </PermissionButton>
                  </j-menu-item>
                </j-menu>
              </template>
            </j-dropdown>
          </j-space>
        </template>
        <template #status="slotProps">
          <BadgeStatus
            :status="slotProps.status"
            :text="slotProps.status ? '启用' : '禁用'"
            :statusNames="{
              1: 'success',
              0: 'error',
            }"
          ></BadgeStatus>
        </template>
        <template #action="slotProps">
          <j-space :size="16">
            <PermissionButton
              :hasPermission="`${permission}:update`"
              type="link"
              :tooltip="{
                title: '编辑',
              }"
              style="padding: 0"
              @click="openDialog(slotProps)"
            >
              <AIcon type="EditOutlined" />
            </PermissionButton>

            <PermissionButton
              :hasPermission="`${permission}:action`"
              type="link"
              :popConfirm="{
                title: `确定要${!!slotProps.status ? '禁用' : '启用'}吗？`,
                onConfirm: () => changeStatus(slotProps),
              }"
              style="padding: 0"
              :tooltip="{
                title: slotProps.status ? '禁用' : '启用',
              }"
            >
              <AIcon
                :type="slotProps.status ? 'StopOutlined' : 'PlayCircleOutlined'"
              />
            </PermissionButton>
            <PermissionButton
              :hasPermission="`${permission}:delete`"
              type="link"
              :tooltip="{
                title: !!slotProps.status ? '请先禁用，再删除' : '删除',
              }"
              danger
              :popConfirm="{
                title: `确认删除`,
                onConfirm: () => clickDel(slotProps),
              }"
              style="padding: 0"
              :disabled="!!slotProps.status"
            >
              <AIcon type="DeleteOutlined" />
            </PermissionButton>
          </j-space>
        </template>
      </j-pro-table>
    </FullPage>
    <!-- 编辑和新增 -->
    <EditDialog v-if="visible" :data="current" @close="visible = false" @save="onSave" />
  </page-container>
</template>

<script setup lang="ts" name="Permission">
import EditDialog from './components/EditDialog.vue'
import {
  getPermission_api,
  editPermission_api,
  delPermission_api,
  exportPermission_api,
} from '@/api/system/permission'
import { usePermission } from '@jetlinks-web/components/src/PermissionButton/hooks'
import { PermissionItem } from './typings'
import { onlyMessage } from '@jetlinks-web/utils'
import { downloadJson } from '@/utils/comm'
import { columns } from './util'

const permission = 'system/Permission'
const { hasPerm } = usePermission(`${permission}:import`)

const params = ref<any>({})
const visible = ref<boolean>(false)
const current = ref<Partial<PermissionItem>>({})
const tableRef = ref<any>({})  // 表格实例

// 搜索
const handleSearch = (e: any) => {
  params.value = {
    terms: e,
  }
}

// 打开编辑弹窗
const openDialog = (row?: PermissionItem) => {
  current.value = { ...row }
  visible.value = true
}

// 导入数据
const clickImport = (file: File) => {
  if (file.type === 'application/json') {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (result: any) => {
      try {
        const data = JSON.parse(result.target.result)
        editPermission_api(data).then((resp) => {
          if (resp.status === 200) {
            onlyMessage('导入成功')
            tableRef.value?.reload()
          }
        })
      } catch (error) {
        onlyMessage('导入失败，请重试！', 'error')
      }
    }
  } else onlyMessage('请上传json格式', 'error')
  return false
}

// 导出数据
const clickExport = () => {
  const _params = {
    paging: false,
    ...params.value,
  }
  exportPermission_api(_params).then((resp) => {
    if (resp.status === 200) {
      downloadJson(resp.result as any, '权限数据')
      onlyMessage('导出成功')
    } else {
      onlyMessage('导出错误', 'error')
    }
  })
}

// 修改状态
const changeStatus = (row: PermissionItem) => {
  const _params = {
    ...row,
    status: row.status ? 0 : 1,
  }
  editPermission_api(_params).then(() => {
    onlyMessage('操作成功')
    tableRef.value.reload()
  })
}

// 删除
const clickDel = (row: PermissionItem) => {
  if(!row.id) return;
  delPermission_api(row.id).then((resp: any) => {
    if (resp.status === 200) {
      tableRef.value?.reload()
      onlyMessage('操作成功!')
    }
  })
}

// 关闭并刷新弹窗
const onSave = () => {
  visible.value = false
  tableRef.value?.reload()
}
</script>
