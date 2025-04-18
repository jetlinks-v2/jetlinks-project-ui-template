<template>
  <div :class="classNames">
    <j-advanced-search
      :target='target || _target'
      :type='type || _target'
      :request='onSaveSearchHistory'
      :historyRequest='onSearchHistory'
      :deleteRequest='onDeleteSearchHistory'
      :columns='_columns'
      :class='props.class || config.class'
      :style='style || config.style'
      @search='searchSubmit'
    />
  </div>
</template>

<script setup lang='ts' name='ProSearch'>
import type { PropType } from 'vue'
import { saveSearchHistory, getSearchHistory, deleteSearchHistory } from '@/api/comm'
import type {SearchContent} from './types'

interface Emit {
  (e: 'search', data: any): void
  (e: 'update:value', data: any): void
}

const props = defineProps({
  value: {
    type: Object,
    default: () => ({})
  },
  columns: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true
  },
  type: {
    type: String,
    default: 'advanced'
  },
  target: {
    type: String,
    default: '',
    required: true
  },
  class: {
    type: String,
    default: ''
  },
  noMargin: {
    type: Boolean,
    default: false
  },
  style: {
    type: Object,
    default: () => ({
      padding: '18px 24px'
    })
  }
})

const config = inject<SearchContent>('pro-search-config', {})
const emit = defineEmits<Emit>()

const classNames = computed(() => {
  return {
    'j-advanced-search-warp': true,
    'no-margin': (props.noMargin || config.noMargin) !== false
  }
})

const _columns = computed(() => {
  if (props.columns.length > 0) {
    return props.columns
  } else if (config.columns?.length) {
    return config.columns
  }
  return []
})

const _target = computed(() => props.target || config.target)

/**
 * 提交
 */
const searchSubmit = (data: any) => {
  emit('update:value', data)
  emit('search', data)
  config.onSearch?.(data)
}

const onSearchHistory = () => getSearchHistory(_target.value!)

const onSaveSearchHistory = (data: any) => saveSearchHistory(data, _target.value!)

const onDeleteSearchHistory = (data: any, t: string) => deleteSearchHistory(data, t)

</script>

<style scoped lang='less'>
  .no-margin {
    :deep(.JSearch-warp) {
      margin: 0;
    }
  }
</style>
