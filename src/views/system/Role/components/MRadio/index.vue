<template>
  <j-radio-group
    :value="_value"
    @change="onRadioChange"
    :disabled="!granted"
  >
    <j-radio
      :value="asset.supportId"
      v-for="(asset, _i) in value"
      :key="_i"
      >{{ asset.name }}</j-radio
    >
  </j-radio-group>
</template>

<script setup lang="ts">
import { PropType } from "vue"

const props = defineProps({
  value: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  granted: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:value', 'change'])

const onRadioChange = (e: any) => {
    const arr = props.value.map(item => {
        return {
            ...item,
            enabled: item.supportId === e.target.value,
            granted: item.supportId === e.target.value
        }
    })
    emits('update:value', arr)
    emits('change')
}

const _value = computed(() => {
    if(props.granted) {
        return props.value.find((i: any) => i?.granted)?.supportId || 'creator'
    } else {
        return ''
    }
})
</script>