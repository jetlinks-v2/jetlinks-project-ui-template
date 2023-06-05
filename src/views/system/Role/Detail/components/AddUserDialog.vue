<template>
  <j-modal
    visible
    title="新增"
    width="1000px"
    @ok="confirm"
    :confirm-loading="loading"
    @cancel="emits('update:visible', false)"
  >
    <j-search :columns="columns" @search="onSearch" />
    <j-pro-table
      ref="tableRef"
      :columns="columns"
      :request="getUserList"
      model="TABLE"
      :bodyStyle="{
        padding: 0,
      }"
      :params="queryParams"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onSelect: onSelect,
        onSelectAll: onSelectAll,
        onSelectNone: cancelSelect,
      }"
      :defaultParams="{
        pageSize: 10,
      }"
      :pagination="{
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        hideOnSinglePage: false,
      }"
    >
    </j-pro-table>
  </j-modal>
</template>

<script setup lang="ts">
import { getUserByRole_api, bindUser_api } from '@/api/role'
import { useRequest } from '@jetlinks/hooks'
import { message } from 'jetlinks-ui-components'

const emits = defineEmits(['refresh', 'update:visible'])
const props = defineProps<{
  visible: boolean
  roleId: string
}>()

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入',
      },
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    search: {
      type: 'string',
      componentProps: {
        placeholder: '请输入',
      },
    },
  },
]
const queryParams = ref({})

const selectedRowKeys = ref<string[]>([])

const getUserList = (oParams: any) => {
  const params = {
    ...oParams,
    sorts: [{ name: 'createTime', order: 'desc' }],
    terms: [
      ...(oParams.terms || []),
      {
        terms: [
          {
            column: 'id$in-dimension$role$not',
            value: props.roleId,
          },
        ],
      },
    ],
  }
  return getUserByRole_api(params)
}

const { loading, run } = useRequest(bindUser_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      message.success('操作成功')
      emits('refresh')
      emits('update:visible', false)
    }
  },
})

const confirm = () => {
  if (selectedRowKeys.value.length < 1) {
    message.error('请至少选择一项')
  } else {
    run(props.roleId, selectedRowKeys.value)
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
    selectedRowKeys.value.map((i: any) => {
      if (!arr.includes(i?.id)) {
        _ids.push(i.id)
      }
    })
    selectedRowKeys.value = _ids
  }
}

const onSearch = (e: any[]) => {
  queryParams.value = {
    terms: e,
  }
}
</script>
