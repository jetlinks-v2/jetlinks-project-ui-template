<template>
  <div style="height: 100%">
    <j-table
      :columns="permissionColumns"
      :data-source="dataSource"
      :pagination="false"
      :rowKey="'id'"
      :scroll="{ y: 'calc(100vh - 620px)' }"
      ref="treeRef"
    >
      <!-- 表头 -->
      <template #headerCell="{ column }">
        <div v-if="column.key === 'menu'">
          <j-checkbox
            :checked="selectedAll"
            :indeterminate="indeterminate"
            @change="selectAllChange"
            >菜单权限</j-checkbox
          >
        </div>
        <div v-else-if="column.key === 'data'">
          <j-space>
            <span>
              数据权限
              <j-tooltip>
                <template #title
                  >勾选任意数据权限均能看到自己创建的数据权限</template
                >
                <AIcon type="QuestionCircleOutlined" />
              </j-tooltip>
            </span>
            <j-checkbox v-model:checked="isBatchSetting">批量设置</j-checkbox>
            <j-select
              size="small"
              v-if="isBatchSetting"
              style="width: 200px"
              :options="_options"
              @change="onBatchSetting"
              placeholder="请选择"
            ></j-select>
          </j-space>
        </div>
        <div v-else>
          <span>{{ column.title }}</span>
        </div>
      </template>
      <!-- 表格内容 -->
      <template #bodyCell="{ column, record }">
        <div v-if="column.key === 'menu'">
          <MCheckBox
            :record="record"
            @change="(val) => onMenuChange(record, val)"
            >{{ record.name }}</MCheckBox
          >
        </div>

        <div v-else-if="column.key === 'action'">
          <div v-if="record.buttons && record.buttons.length > 0">
            <j-checkbox
              v-model:checked="button.granted"
              v-for="(button, _i) in record.buttons"
              :key="_i"
              @change="() => onButtonChange(record)"
              >{{ button.name }}</j-checkbox
            >
          </div>
        </div>
        <div v-else-if="column.key === 'data'">
          <span v-if="record.accessSupport === undefined">
            不支持数据权限配置，默认可查看全部数据
          </span>
          <div v-else-if="record.accessSupport.value === 'support'">
            <MRadio
              v-model:value="record.assetAccesses"
              @change="onAssetAccesses"
              :granted="record.granted"
            />
          </div>
          <span
            v-else-if="
              record.accessSupport.value === 'indirect' ||
              record.accessSupport.value === 'unsupported'
            "
            >{{ record.accessDescription }}</span
          >
        </div>
      </template>
    </j-table>
  </div>
</template>

<script setup lang="ts" name="PermissionTree">
import { cloneDeep, uniqBy } from 'lodash-es'
import { permissionColumns } from '../../util'
import MCheckBox from '../MCheckBox/index.vue'
import MRadio from '../MRadio/index.vue'
import {
  findDataById,
  getChecked,
  getIndeterminate,
  handleValue,
  updateData,
} from '../util'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['update:value'])

const dataSource = ref<any[]>([])

// 全选
const selectedAll = ref<boolean>(false)
const indeterminate = ref<boolean>(false)

// 批量设置
const isBatchSetting = ref<boolean>(false)

// 处理数据权限
const handleAccessValue = (arr: any[], _arr: any[]) => {
  arr.forEach((item) => {
    if (item.granted) {
      ;(item?.assetAccesses || []).forEach((i) => {
        _arr.push({
          label: i.name,
          value: i.supportId,
        })
      })
    }
    if (Array.isArray(item.children) && item.children.length > 0) {
      handleAccessValue(item.children, _arr)
    }
  })
}

// 数据权限下拉
const _options = computed(() => {
  const _arr: any[] = []
  handleAccessValue(cloneDeep(dataSource.value), _arr)
  return uniqBy(_arr, 'value') || []
})

// 勾选菜单
const onMenuChange = (obj: any, val: boolean) => {
  const _item = cloneDeep(obj)
  const _obj = handleValue(_item, val)
  const arr = findDataById(cloneDeep(dataSource.value), _obj)
  emits('update:value', arr)
}

// 全选
const selectAllChange = (e: any) => {
  const val = e.target.checked
  const obj = {
    id: '*',
    granted: val,
    children: cloneDeep(dataSource.value),
  }
  emits('update:value', handleValue(obj, val)?.children || [])
}

// 批量操作
const onBatchSetting = (val: any) => {
  const arr = updateData(cloneDeep(dataSource.value), val)
  emits('update:value', arr)
}

// 批量设置
const onAssetAccesses = () => {
  isBatchSetting.value = false
  emits('update:value', dataSource.value)
}

// 修改按钮权限
const onButtonChange = (obj: any) => {
  const _obj = {
    ...obj,
    granted: (obj.buttons || []).some((item) => item.granted),
  }
  const arr = findDataById(cloneDeep(dataSource.value), _obj)
  emits('update:value', arr)
}

watch(
  () => dataSource.value,
  () => {
    const obj = {
      id: '*',
      children: dataSource.value,
    }
    selectedAll.value = getChecked(obj)
    if (!selectedAll.value) {
      indeterminate.value = getIndeterminate(obj)
    } else {
      indeterminate.value = false
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

watch(
  () => props.value,
  () => {
    dataSource.value = props.value || []
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>