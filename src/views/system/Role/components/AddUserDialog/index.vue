<template>
  <j-modal
    visible
    title="新增"
    width="1000px"
    @ok="confirm"
    :confirm-loading="loading"
    @cancel="emits('close')"
  >
    <j-search style="padding: 0" :columns="columns" @search="onSearch" />
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
    >
    </j-pro-table>
  </j-modal>
</template>

<script setup lang="ts">
import { getUserByRole_api, bindUser_api } from '@/api/role'
import { useRequest } from '@jetlinks/hooks'
import { onlyMessage } from '@jetlinks/utils'

const emits = defineEmits(['close', 'save'])
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
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
    ellipsis: true,
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

// 获取数据
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
            value: props.id,
          },
        ],
      },
    ],
  }
  return getUserByRole_api(params)
}

// 提交数据
const { loading, run } = useRequest(bindUser_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      onlyMessage('操作成功')
      emits('save')
    }
  },
})

// 确认按钮
const confirm = () => {
  if (selectedRowKeys.value.length < 1) {
    onlyMessage('请至少选择一项', 'warning')
  } else {
    run(props.id, selectedRowKeys.value)
  }
}
const cancelSelect = () => {
  selectedRowKeys.value = []
}

// 选择
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

// 全选
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

// 搜索
const onSearch = (e: any[]) => {
  queryParams.value = {
    terms: e,
  }
}
</script>
