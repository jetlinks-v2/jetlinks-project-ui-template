<template>
  <page-container>
    <div class="user-container">
      <j-search :labelWidth="50" :columns="columns" target="category" @search="handleParams" />
      <FullPage>
        <j-pro-table
          ref="tableRef"
          :columns="columns"
          :request="getUserList_api"
          model="TABLE"
          :params="queryParams"
          :defaultParams="{
            pageSize: 10,
            sorts: [{ name: 'createTime', order: 'desc' }],
          }"
          :pagination="{
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
          }"
        >
          <template #headerTitle>
            <PermissionButton
              :hasPermission="`${permission}:add`"
              type="primary"
              @click="openDialog('add')"
            >
              <AIcon type="PlusOutlined" />新增
            </PermissionButton>
          </template>
          <template #type="slotProps">
            {{ slotProps.type.name }}
          </template>
          <template #status="slotProps">
            <BadgeStatus
              :status="slotProps.status"
              :text="slotProps.status ? '正常' : '禁用'"
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
                @click="openDialog('edit', slotProps)"
              >
                <AIcon type="EditOutlined" />
              </PermissionButton>
              <PermissionButton
                v-if="slotProps.status"
                :hasPermission="`${permission}:action`"
                type="link"
                :tooltip="{
                  title: '禁用',
                }"
                :popConfirm="{
                  title: `确定禁用吗？`,
                  onConfirm: () => changeStatus(slotProps),
                }"
              >
                <AIcon type="StopOutlined" />
              </PermissionButton>
              <PermissionButton
                v-else
                :hasPermission="`${permission}:action`"
                type="link"
                :tooltip="{
                  title: `启用`,
                }"
                :popConfirm="{
                  title: `确定启用吗？`,
                  onConfirm: () => changeStatus(slotProps),
                }"
              >
                <AIcon type="PlayCircleOutlined" />
              </PermissionButton>
              <PermissionButton
                :hasPermission="`${permission}:update`"
                type="link"
                :tooltip="{
                  title: '重置密码',
                }"
                @click="openDialog('reset', slotProps)"
              >
                <AIcon type="icon-zhongzhimima" />
              </PermissionButton>
              <PermissionButton
                type="link"
                :hasPermission="`${permission}:delete`"
                :tooltip="{
                  title: slotProps.status ? '请先禁用，再删除' : '删除',
                }"
                danger
                :popConfirm="{
                  title: `确认删除`,
                  onConfirm: () => clickDel(slotProps.id),
                }"
                :disabled="slotProps.status"
              >
                <AIcon type="DeleteOutlined" />
              </PermissionButton>
            </j-space>
          </template>
        </j-pro-table>
      </FullPage>

      <EditUserDialog
        v-if="visible"
        :type="dialog.type"
        v-model:visible="visible"
        :data="dialog.selectItem"
        @confirm="refresh"
      />
    </div>
  </page-container>
</template>

<script setup lang="ts" name="UserMange">
import EditUserDialog from './components/EditUserDialog.vue'
import {
  getUserType_api,
  getUserList_api,
  changeUserStatus_api,
  deleteUser_api,
} from '@/api/user'
import { message } from 'jetlinks-ui-components'

const permission = 'system/User'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入姓名',
      },
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    ellipsis: true,
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入用户名',
      }
    },
  },
  {
    title: '用户类型',
    dataIndex: 'type',
    key: 'type',
    ellipsis: true,
    search: {
      type: 'select',
      componentProps: {
        placeholder: '请选择用户类型',
      },
      options: () =>
        new Promise((resolve) => {
          getUserType_api().then((resp: any) => {
            resolve(
              resp.result.map((item: dictType) => ({
                label: item.name,
                value: item.id,
              })),
            )
          })
        }),
    },
    scopedSlots: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    search: {
      rename: 'status',
      type: 'select',
      componentProps: {
        placeholder: '请选择状态',
      },
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
    scopedSlots: true,
  },
  {
    title: '手机号',
    dataIndex: 'telephone',
    key: 'telephone',
    ellipsis: true,
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入手机号',
      }
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入邮箱',
      }
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right',
    scopedSlots: true,
  },
]
type dictType = {
  id: string
  name: string
}
type modalType = '' | 'add' | 'edit' | 'reset'

const dialog = reactive({
  selectItem: {},
  type: '' as modalType,
})

const queryParams = ref({})
const visible = ref<boolean>(false)

const tableRef = ref<Record<string, any>>({}) // 表格实例
// 打开编辑弹窗
const openDialog = (type: modalType, row?: any) => {
  dialog.selectItem = { ...(row || {}) }
  dialog.type = type
  visible.value = true
}
const changeStatus = ({ id, status }: any) => {
  const params = {
    status: status === 0 ? 1 : 0,
    id,
  }
  changeUserStatus_api(params).then(() => {
    message.success('操作成功')
    tableRef.value.reload()
  })
}
// 删除
const clickDel = (id: string) => {
  deleteUser_api(id).then(() => {
    message.success('操作成功')
    tableRef.value.reload()
  })
}

const refresh = () => {
  tableRef.value.reload()
}

const handleParams = (params: any[]) => {
  const newParams = (params as any[])?.map((item) => {
    let arr: any[] = []
    if (['telephone', 'email'].includes(item.column)) {
      return {
        column: 'id$user-detail',
        value: [item],
      }
    }
    if (['type'].includes(item.column) && item.value === 'other') {
      arr = [
        {
          ...item,
          type: 'or',
          termType: 'isnull',
          value: 1,
        },
        {
          ...item,
          type: 'or',
          termType: 'empty',
          value: 1,
        },
      ]
    }
    if (arr.length) {
      item.terms = [...item.terms, ...arr]
    }
    return item
  })
  queryParams.value = { terms: newParams || [] }
}
</script>

<style lang="less" scoped>
.user-container {
  :deep(.ant-table-tbody) {
    .ant-table-cell {
      .ant-space-item {
        .ant-btn-link {
          padding: 0;
        }
      }
    }
  }
}
</style>
