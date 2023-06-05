<template>
  <div>
    <pro-search
      :columns="columns"
      target="category-user"
      @search="handleParams"
      style="margin-bottom: 0"
    />
    <FullPage>
      <j-pro-table
        ref="tableRef"
        :columns="columns"
        :request="requestFun"
        :params="queryParams"
        :rowSelection="{
          selectedRowKeys: _selectedRowKeys,
          onSelect: onSelect,
          onSelectAll: onSelectAll,
          onSelectNone: cancelSelect,
        }"
        model="TABLE"
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
            <PermissionButton
              type="primary"
              :hasPermission="`${permission}:bind-user`"
              @click="dialogVisible = true"
              style="margin-right: 15px"
              :disabled="isShow"
            >
              <AIcon type="PlusOutlined" />绑定用户
            </PermissionButton>
            <PermissionButton
              :hasPermission="`${permission}:bind`"
              :popConfirm="{
                title: `是否解除绑定`,
                onConfirm: () => unBind(),
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
        <template #action="slotProps">
          <j-space :size="16">
            <PermissionButton
              type="link"
              :hasPermission="`${permission}:bind`"
              :popConfirm="{
                title: `是否解除绑定`,
                onConfirm: () => unBind(slotProps),
              }"
            >
              <AIcon type="DisconnectOutlined" />
            </PermissionButton>
          </j-space>
        </template>
      </j-pro-table>
    </FullPage>

    <div class="dialogs">
      <AddBindUserDialog
        v-if="dialogVisible"
        v-model:visible="dialogVisible"
        :parent-id="props.parentId"
        @confirm="refresh"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="user">
import AddBindUserDialog from './components/AddBindUserDialog.vue'
import { getBindUserList_api, unBindUser_api } from '@/api/department'
import { message } from 'jetlinks-ui-components'

const permission = 'system/Department'

const props = defineProps({
  parentId: {
    type: String,
    default: '',
  },
})

const isShow = computed(() => {
  return !props.parentId
})

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    fixed: 'left',
    search: {
      type: 'string',
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    ellipsis: true,
    fixed: 'left',
    search: {
      type: 'string',
    },
  },

  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    fixed: 'left',
    search: {
      type: 'select',
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
    scopedSlots: true,
    width: '200px',
  },
]
// 搜索参数
const queryParams = ref({})

const dialogVisible = ref(false)

const handleParams = (params: any) => {
  queryParams.value = params
}

// 表格
const tableRef = ref<Record<string, any>>({}) // 表格实例

const _selectedRowKeys = ref<string[]>([])

// 刷新列表
const refresh = () => {
  tableRef.value.reload()
}

const cancelSelect = () => {
  _selectedRowKeys.value = []
}
const onSelect = (record: any, selected: boolean) => {
  const arr = [..._selectedRowKeys.value]
  const _index = arr.findIndex((item) => item === record?.id)
  if (selected) {
    if (!(_index > -1)) {
      _selectedRowKeys.value.push(record.id)
    }
  } else {
    if (_index > -1) {
      // 去掉数据
      _selectedRowKeys.value.splice(_index, 1)
    }
  }
}
const onSelectAll = (selected: boolean, _: any[], changeRows: any) => {
  if (selected) {
    changeRows.map((i: any) => {
      if (!_selectedRowKeys.value.includes(i.id)) {
        _selectedRowKeys.value.push(i.id)
      }
    })
  } else {
    const arr = changeRows.map((item: any) => item.id)
    const _ids: string[] = [];
    _selectedRowKeys.value.map((i: any) => {
      if (!arr.includes(i)) {
        _ids.push(i)
      }
    })
    _selectedRowKeys.value = _ids
  }
}

const requestFun = async (oParams: any) => {
  if (props.parentId) {
    const params = {
      ...oParams,
      sorts: [{ name: 'createTime', order: 'desc' }],
      terms: [
        ...oParams.terms,
        {
          terms: [
            {
              column: 'id$in-dimension$org',
              value: props.parentId,
            },
          ],
          type: 'and',
        },
      ],
    }
    const resp: any = await getBindUserList_api(params)
    return {
      code: resp.status,
      result: resp.result,
      status: resp.status,
    }
  } else {
    return {
      code: 200,
      result: {
        data: [],
        pageIndex: 0,
        pageSize: 0,
        total: 0,
      },
      status: 200,
    }
  }
}
const unBind = (row?: any) => {
  const ids = row ? [row.id] : _selectedRowKeys.value
  if (ids.length < 1) return message.warning('请勾选需要解绑的数据')

  unBindUser_api(props.parentId, ids).then(() => {
    message.success('操作成功')
    refresh()
  })
}

watch(
  () => props.parentId,
  () => {
    refresh()
  },
)
</script>
