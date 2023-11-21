<template>
  <page-container>
    <div class="user-container">
      <!-- 搜索框 -->
      <j-search :labelWidth="50" :columns="columns" target="category" @search="onSearch" />
      <FullPage>
        <!-- 用户管理表格 -->
        <j-pro-table :columns="columns" model="TABLE" ref="tableRef"
                     :request="getUserList_api"
                     :params = "queryParams">
          <!-- 新增用户按钮 -->
          <template #headerTitle>
            <PermissionButton :hasPermission="`${permission}:add`" type="primary" @click="showModal('add')" >
              <AIcon type="PlusOutlined" />新增
            </PermissionButton>
          </template>
          <!-- 用户类型显示处理 -->
          <template #type="slotProps">
            {{ slotProps.type.name }}
          </template>
          <!-- 状态显示处理 -->
          <template #status="slotProps">
            <BadgeStatus :status="slotProps.status" :text="slotProps.status ? '正常' : '禁用'" :statusNames="{0: 'error', 1: 'success'}"></BadgeStatus>
          </template>
          <!-- 操作列 -->
          <template #action="slotProps">
            <j-space :size="16">
              <!-- 编辑按钮 -->
              <PermissionButton :hasPermission="`${permission}:update`" type="link" :tooltip="{title: '编辑'}" @click="showModal('edit', slotProps)">
                <AIcon type="EditOutlined" />
              </PermissionButton>
              <!-- 状态修改按钮 -->
              <!-- 状态为正常时显示 -->
              <PermissionButton v-if="slotProps.status" :hasPermission="`${permission}:action`" type="link"
                                :tooltip="{title: '禁用'}" :popConfirm="{title: '确定禁用吗？', onConfirm: () => changeStatus(slotProps)}">
                <AIcon type="StopOutlined" />
              </PermissionButton>
              <!-- 状态为禁用时显示 -->
              <PermissionButton v-else :hasPermission="`${permission}:action`" type="link"
                                :tooltip="{title: '启用'}" :popConfirm="{title: '确定启用吗？', onConfirm: () => changeStatus(slotProps)}">
                <AIcon type="PlayCircleOutlined" />
              </PermissionButton>
              <!-- 重置密码按钮 -->
              <PermissionButton :hasPermission="`${permission}:update`" type="link" :tooltip="{title: '重置密码'}" @click="showModal('reset', slotProps)">
                <AIcon type="icon-zhongzhimima" />
              </PermissionButton>
              <!-- 删除按钮 -->
              <PermissionButton :hasPermission="`${permission}:delete`" type="link"  danger
                                :tooltip="{title: slotProps.status ? '请先禁用，再删除' : '删除'}"
                                :popConfirm="{title: '确定删除', onConfirm: () => deleteUser(slotProps.id)}"
                                :disabled="slotProps.status">
                <AIcon type="DeleteOutlined" />
              </PermissionButton>
            </j-space>
          </template>
        </j-pro-table>
      </FullPage>
      <UserDialog v-model:visible="visible" :data="dialog.data" :modalType="dialog.modalType" @handle-ok="refresh"/>
    </div>
  </page-container>
</template>

<script setup lang="ts">
import columns from './columns'
import { ModalType } from './typing'
import { ref, reactive } from 'vue';
import UserDialog from './components/UserDialog/UserDialog.vue';
import { getUserList_api, changeUserStatus_api, deleteUser_api } from '@/api/user';
import { onlyMessage } from '@jetlinks-web/utils';

// 权限
const permission = 'system/User'

// 表格实例
const tableRef = ref<any>()

// 控制对话框的显示
const visible = ref<boolean>(false);

// 搜索框的搜索参数
const queryParams = ref<Object>({})

// 对话框数据
const dialog = reactive({
  data: {},
  modalType: '' as ModalType
})

 /**
 * 显示对话框
 * @param type 对话框类型
 * @param [data] 向对话框传递的数据
 */
const showModal = (type: ModalType, data?: any) => {
  dialog.data = { ...(data || {}) }
  dialog.modalType = type
  visible.value = true;
}

 /**
 * 重新加载表格数据
 */
const refresh = () => {
  tableRef.value.reload()
}

 /**
 * 搜索事件
 * @param params 传入参数
 */
const onSearch = (params: any[]) => {
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

 /**
 * 修改用户状态
 * @param {id, status} 参数对象 {用户id， 用户当前状态}
 */
const changeStatus = ({ id, status }: any) => {
  const params = {
    status: status === 0 ? 1 : 0,
    id,
  }
  changeUserStatus_api(params).then(() => {
    onlyMessage('操作成功', 'success')
    tableRef.value.reload()
  })
}

//
 /**
 * 删除用户
 * @param id 用户id
 */
const deleteUser = (id: string) => {
  deleteUser_api(id).then(() => {
    onlyMessage('操作成功', 'success')
    tableRef.value.reload()
  })
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
