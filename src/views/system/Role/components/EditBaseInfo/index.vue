<template>
  <j-form ref="formRef" :model="formModel" layout="vertical">
    <j-form-item
      name="name"
      label="名称"
      :rules="[
        { required: true, message: '请输入名称' },
        { max: 64, message: '最多可输入64个字符' },
      ]"
    >
      <j-input
        v-model:value="formModel.name"
        placeholder="请输入角色名称"
        allow-clear
      />
    </j-form-item>
    <j-form-item name="description" label="说明">
      <j-textarea
        v-model:value="formModel.description"
        placeholder="请输入说明"
        allow-clear
        :maxlength="200"
        show-count
      />
    </j-form-item>
  </j-form>
</template>
  
<script setup lang="ts">
import { watchEffect } from "vue";
import { RoleItem } from "../../typings";

const props = defineProps({
  value: {
    type: Object,
    default: () => {},
  },
})
const emits = defineEmits(['update:value'])

const formModel = reactive<RoleItem>({
  id: undefined,
  name: '',
  description: '',
})

const formRef = ref<any>()

watchEffect(() => {
    Object.assign(formModel, props.value)
})

const onSave = () => {
  return new Promise((resolve, reject) => {
    formRef.value
      .validate()
      .then((_data: RoleItem) => {
        emits('update:value', {...formModel, ..._data})
        resolve(_data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

defineExpose({ onSave })
</script>
  