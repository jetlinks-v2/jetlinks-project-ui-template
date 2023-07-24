<template>
  <j-search :columns="userColumns" target="category" @search="onSearch" />
  <j-pro-table
    ref="tableRef"
    :columns="userColumns"
    :request="getList"
    model="TABLE"
    :params="params"
    :rowSelection="{
      selectedRowKeys: selectedRowKeys,
      onSelect: onSelect,
      onSelectAll: onSelectAll,
      onSelectNone: cancelSelect,
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
    </template>
  </j-pro-table>
  <!-- 新增用户 -->
  <AddUserDialog
    v-if="dialogVisible"
    :id="roleId"
    @close="dialogVisible = false"
    @save="onSave"
  />
</template>

<script setup lang="ts" name="RoleUser">
import AddUserDialog from '../../components/AddUserDialog/index.vue'
import { getUserByRole_api, unbindUser_api } from '@/api/role'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import { userColumns } from '../../util'
import { onlyMessage } from '@jetlinks/utils'

const roleId = useRoute().params.id as string

const params = ref({})
const tableRef = ref<Record<string, any>>({})
const selectedRowKeys = ref<string[]>([])
// 弹窗相关
const dialogVisible = ref(false)

// 刷新表格
const refresh = () => {
  tableRef.value.reload()
  selectedRowKeys.value = []
}

// 查询数据
const getList = (oParams: any) => {
  const _params = {
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
    _params.terms.unshift({
      terms: oParams.terms[0].terms,
    })
  return getUserByRole_api(_params)
}

// 批量解绑
const unbind = (ids?: string[]) => {
  const data = ids ? ids : selectedRowKeys.value
  if (!data.length) {
    onlyMessage('请勾选数据', 'warning')
    return
  }
  unbindUser_api(roleId, data).then((resp) => {
    if (resp.status === 200) {
      onlyMessage('操作成功')
      refresh()
    }
  })
}

// 搜索
const onSearch = (e: any[]) => {
  params.value = {
    terms: e,
  }
}

// 取消全选
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
    const _ids: string[] = [];
    [...selectedRowKeys.value].map((i: any) => {
      if (!arr.includes(i)) {
        _ids.push(i)
      }
    })
    selectedRowKeys.value = _ids
  }
}

// 保存
const onSave = () => {
  dialogVisible.value = false
  tableRef.value.reload()
}
</script>
