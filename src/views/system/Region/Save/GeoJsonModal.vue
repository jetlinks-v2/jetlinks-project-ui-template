<template>
  <a-modal
    visible
    width="650px"
    :title="$t('Save.GeoJsonModal.692990-0')"
    :maskClosable="false"
    @ok="handleSave"
    @cancel="handleCancel"
  >
    <div>
      {{ $t('Save.GeoJsonModal.692990-1') }}
    </div>
    <monaco-editor
      language="json"
      style="height: 400px"
      v-model:modelValue="myValue"
    />
  </a-modal>
</template>

<script setup name="GeoJsonModal">

const props = defineProps({
  value: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['ok', 'cancel'])

const myValue = ref(props.value ? JSON.stringify(props.value) : undefined)

const handleSave = () => {
  emit('ok', myValue.value ? JSON.parse(myValue.value) : undefined)
}

const handleCancel = () => {
  emit('cancel')
}

</script>

<style scoped>

</style>
