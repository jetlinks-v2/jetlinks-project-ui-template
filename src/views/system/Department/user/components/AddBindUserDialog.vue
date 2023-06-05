<template>
  <j-modal
    class="add-bind-user-dialog-container"
    title="绑定"
    width="1440px"
    visible
    centered
    :confirmLoading="loading"
    @ok="confirm"
    @cancel="cancel"
  >
    <j-search :columns="columns" target="category" @search="onSearch" />
    <div class="table">
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
        :bodyStyle="{ padding: '0 24px' }"
        model="TABLE"
        :defaultParams="{
          pageSize: 10,
          sorts: [{ name: 'createTime', order: 'desc' }],
        }"
        :pagination="{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }"
      />
    </div>
  </j-modal>
</template>

<script setup lang="ts">
import { bindUser_api, getBindUserList_api } from '@/api/department'
import { useRequest } from '@jetlinks/hooks'
import { message } from 'jetlinks-ui-components'

const emits = defineEmits(['confirm', 'update:visible'])

const props = defineProps({
  parentId: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

// 弹窗相关

const { loading, run } = useRequest(bindUser_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      message.success('操作成功')
      emits('confirm')
      emits('update:visible', false)
      _selectedRowKeys.value = []
    }
  },
})

const confirm = () => {
  if (_selectedRowKeys.value.length && props.parentId) {
    run(props.parentId, _selectedRowKeys.value)
  } else {
    message.warning('请选择要绑定的用户')
  }
}

const cancel = () => {
  emits('update:visible', false)
}

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
      },
    },
  },
]
const queryParams = ref({})

const _selectedRowKeys = ref<string[]>([])

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
    const _ids: string[] = []
    ;[..._selectedRowKeys.value].map((i: any) => {
      if (!arr.includes(i)) {
        _ids.push(i)
      }
    })
    _selectedRowKeys.value = _ids
  }
}
const requestFun = async (oParams: any) => {
  // cancelSelect()
  if (props.parentId) {
    const params = {
      ...oParams,
      sorts: [{ name: 'createTime', order: 'desc' }],
      terms: [
        ...oParams.terms,
        {
          terms: [
            {
              column: 'id$in-dimension$org$not',
              value: props.parentId,
            },
          ],
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

const onSearch = (e: any[]) => {
  queryParams.value = {
    terms: e
  }
}
</script>

<style lang="less" scoped>
:deep(.add-bind-user-dialog-container) {
  .table {
    height: 600px;
    overflow-y: auto;
  }
}
</style>
