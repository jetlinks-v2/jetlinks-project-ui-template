<template>
  <j-modal
    visible
    title="新增"
    width="670px"
    @cancel="emits('close')"
    @ok="confirm"
    :confirm-loading="loading"
  >
    <EditBaseInfo ref="baseRef" v-model:value="formModel" />
  </j-modal>
</template>

<script setup lang="ts">
import { saveRole_api } from '@/api/role'
import { useMenuStore } from '@/store/menu'
import { useRoute } from 'vue-router'
import { useRequest } from '@jetlinks/hooks'
import EditBaseInfo from '../EditBaseInfo/index.vue'
import { RoleItem } from '../../typings'
import { onlyMessage } from '@jetlinks/utils'

const route = useRoute()
const { jumpPage } = useMenuStore()

const emits = defineEmits(['close', 'save'])

// 弹窗相关
const formModel = ref<RoleItem>({
  id: undefined,
  name: '',
  description: ''
})
const baseRef = ref<any>()

const { loading, run } = useRequest(saveRole_api, {
  immediate: false,
  onSuccess(res: any) {
    if (res.success) {
      onlyMessage('操作成功')
      emits('save')

      if (route.query.save) {
        // @ts-ignore
        window?.onTabSaveSuccess(res.result.id)
        setTimeout(() => window.close(), 300)
      } else {
        jumpPage(`system/Role/Detail`, {
          params: {
            id: res?.result.id,
          },
        })
      }
    }
  },
})

const confirm = async () => {
  const _data = await baseRef.value?.onSave()
  if(_data) {
    run(_data)
  }
}
// 表单相关
</script>

<style scoped></style>
