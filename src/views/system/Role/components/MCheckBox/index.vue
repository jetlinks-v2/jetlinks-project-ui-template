<template>
  <j-checkbox
    :checked="_checked"
    :indeterminate="_indeterminate"
    @change="selectAllChange"
    ><slot></slot
  ></j-checkbox>
</template>

<script setup lang="ts">
import { getChecked, getIndeterminate } from '../util';

const props = defineProps({
  record: {
    type: Object,
    default: () => {},
  },
})

const emits = defineEmits(['change'])

const _checked = computed(() => {
  return getChecked(props.record)
})

const _indeterminate = computed(() => {
  if (_checked.value) {
    return false
  } else {
    return getIndeterminate(props.record)
  }
})

const selectAllChange = (e: any) => {
  emits('change', e.target.checked)
}
</script>