<template>
  <div>
    <div class="card">
      <TitleComponent data="基本信息" />
      <EditBaseInfo ref="baseRef" v-model:value="formModel.data" />
    </div>

    <div class="card">
      <TitleComponent data="权限分配" />
      <PermissionTree v-model:value="formModel.menus" />
      <PermissionButton
        hasPermission="system/Role:update"
        type="primary"
        :loading="loading"
        @click="clickSave"
        style="margin-top: 24px"
      >
        保存
      </PermissionButton>
    </div>
  </div>
</template>

<script setup lang="ts" name="RolePermission">
import EditBaseInfo from '../../components/EditBaseInfo/index.vue'
import PermissionTree from '../../components/PermissionTree/index.vue'
import {
  getRoleDetails_api,
  updateRole_api,
  updatePermissionTree_api,
  getPermissionTree_api,
} from '@/api/role'
import { useRoute } from 'vue-router'
import { RoleType } from '../../typings'
import { flattenArray } from '../../util'
import { onlyMessage } from '@jetlinks-web/utils'

const route = useRoute()
const roleId = route.params.id as string

const loading = ref<boolean>(false)
const baseRef = ref<any>()

const formModel = reactive<RoleType>({
  data: {
    id: '',
    name: '',
    description: '',
  },
  menus: [],
})

const getBaseInfo = () => {
  getRoleDetails_api(roleId).then((resp) => {
    if (resp.success) {
      Object.assign(formModel.data, resp.result)
    }
  })
}

const getMenuData = () => {
  getPermissionTree_api(roleId).then((resp) => {
    if (resp.success) {
      Object.assign(formModel.menus, resp.result)
    }
  })
}

const clickSave = async () => {
  const _data = await baseRef.value?.onSave()
  if (_data) {
    const response = await updateRole_api(formModel.data)
    const resp = await updatePermissionTree_api(roleId, {
      menus: flattenArray(formModel.menus),
    })
    if (response.success && resp.success) {
      onlyMessage('操作成功！')
    }
  }
}

onMounted(() => {
  getBaseInfo()
  getMenuData()
})
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
  background-color: #fff;
  padding: 24px;
}
</style>
