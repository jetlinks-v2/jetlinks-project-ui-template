<template>
  <div class="role-user-container">
    <j-search :columns="columns" target="category" @search="onSearch" />

    <j-pro-table
      ref="tableRef"
      :columns="columns"
      :request="getList"
      model="TABLE"
      :params="queryParams"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onSelect: onSelect,
        onSelectAll: onSelectAll,
        onSelectNone: cancelSelect,
      }"
      @cancelSelect="selectedRowKeys = []"
      size="small"
      :defaultParams="{
        pageSize: 10,
      }"
      :pagination="{
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      }"
    >
      <template #headerTitle>
        <j-space>
          <j-button type="primary" @click="dialogVisible = true">
            <AIcon type="PlusOutlined" />新增
          </j-button>
          <PermissionButton
            :popConfirm="{
              title: `是否批量解除绑定`,
              onConfirm: () => unbind(),
            }"
          >
            <AIcon type="DisconnectOutlined" />批量解绑
          </PermissionButton>
        </j-space>
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
      <template #createTime="slotProps">
        {{ dayjs(slotProps.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>

      <template #action="slotProps">
        <j-space :size="16">
          <PermissionButton
            type="link"
            :tooltip="{ title: '解绑' }"
            :pop-confirm="{
              title: `确认解绑`,
              onConfirm: () => unbind([slotProps.id]),
            }"
          >
            <AIcon type="DisconnectOutlined" />
          </PermissionButton>
        </j-space>
      </template>
    </j-pro-table>

    <AddUserDialog
      v-if="dialogVisible"
      v-model:visible="dialogVisible"
      :role-id="roleId"
      @refresh="refresh"
    />
  </div>
</template>

<script setup lang="ts" name="RoleUser">
import AddUserDialog from '../components/AddUserDialog.vue'
import { getUserByRole_api, unbindUser_api } from '@/api/role'
import { message } from 'jetlinks-ui-components'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'

const roleId = useRoute().params.id as string

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入'
      }
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入'
      }
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    search: {
      type: 'date',
    },
    scopedSlots: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    search: {
      type: 'select',
      componentProps: {
        placeholder: '请选择'
      },
      options: [
        {
          label: '正常',
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
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '200px',
    scopedSlots: true,
  },
]
const queryParams = ref({})

const tableRef = ref<Record<string, any>>({})
const selectedRowKeys = ref<string[]>([])
// 弹窗相关
const dialogVisible = ref(false)

// 刷新表格
const refresh = () => {
  tableRef.value.reload()
  selectedRowKeys.value = []
}

const getList = (oParams: any) => {
  const params = {
    ...oParams,
    terms: [
      {
        terms: [
          {
            column: 'id$in-dimension$role',
            value: roleId,
          },
        ],
      },
    ],
  }
  if (oParams.terms[0])
    params.terms.unshift({
      terms: oParams.terms[0].terms,
    })
  return getUserByRole_api(params)
}
// 批量解绑
const unbind = (ids?: string[]) => {
  const data = ids ? ids : selectedRowKeys.value
  if (!data.length) {
    message.warning('请勾选数据')
    return
  }
  unbindUser_api(roleId, data).then((resp) => {
    if (resp.status === 200) {
      message.success('操作成功')
      refresh()
    }
  })
}

const onSearch = (e: any[]) => {
  queryParams.value = {
    terms: e,
  }
}

const cancelSelect = () => {
  selectedRowKeys.value = []
}
const onSelect = (record: any, selected: boolean) => {
  const arr = [...selectedRowKeys.value]
  const _index = arr.findIndex((item) => item === record?.id)
  if (selected) {
    if (!(_index > -1)) {
      selectedRowKeys.value.push(record.id)
    }
  } else {
    if (_index > -1) {
      // 去掉数据
      selectedRowKeys.value.splice(_index, 1)
    }
  }
}
const onSelectAll = (selected: boolean, _: any[], changeRows: any) => {
  if (selected) {
    changeRows.map((i: any) => {
      if (!selectedRowKeys.value.includes(i.id)) {
        selectedRowKeys.value.push(i.id)
      }
    })
  } else {
    const arr = changeRows.map((item: any) => item.id)
    const _ids: string[] = []
    ;[...selectedRowKeys.value].map((i: any) => {
      if (!arr.includes(i)) {
        _ids.push(i)
      }
    })
    selectedRowKeys.value = _ids
  }
}
</script>

<style lang="less" scoped>
.role-user-container {
  background-color: #fff;

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
