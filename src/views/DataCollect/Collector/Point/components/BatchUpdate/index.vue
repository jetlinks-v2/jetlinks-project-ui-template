<template>
  <a-modal
    title="批量编辑"
    :visible="true"
    width="700px"
    @cancel="handleCancel"
    :destroyOnClose="true"
  >
    <div class="sizeText">
      将批量修改
      {{ data.length }} 条数据的访问类型、采集频率、只推送变化的数据
    </div>
    <a-form
      class="form"
      layout="vertical"
      :model="formData"
      name="basic"
      autocomplete="off"
      ref="formRef"
    >
      <a-form-item label="访问类型" name="accessModes">
        <j-card-select
          multiple
          :showImage="false"
          v-model:value="formData.accessModes"
          :options="[
            { label: '读', value: 'read' },
            { label: '写', value: 'write' },
            { label: '订阅', value: 'subscribe' },
          ]"
        />
      </a-form-item>
      <a-form-item
        :name="['interval']"
        :rules="[
          {
            pattern: regOnlyNumber,
            message: '请输入0或者正整数',
          },
        ]"
      >
        <template #label>
          <span>
            采集频率
            <a-tooltip title="采集频率为0时不执行轮询任务">
              <AIcon type="QuestionCircleOutlined" style="margin-left: 2px" />
            </a-tooltip>
          </span>
        </template>
        <a-input-number
          style="width: 100%"
          placeholder="请输入采集频率"
          v-model:value="formData.interval"
          addon-after="ms"
          :max="2147483648"
          :min="0"
          :precision="0"
        />
      </a-form-item>

      <a-form-item :name="['features']">
        <a-checkbox-group v-model:value="formData.features">
          <a-checkbox value="changedOnly" name="type"
            >只推送变化的数据
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <j-permission-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
        style="margin-left: 8px"
        :hasPermission="`DataCollect/Collector:update`"
      >
        确认
      </j-permission-button>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
import { savePointBatch } from '@/api/data-collect/collector'
import { cloneDeep, isObject } from 'lodash-es'
import { regOnlyNumber } from '../../../data'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['change'])
const loading = ref(false)
const formRef = ref<FormInstance>()

const formData = ref({
  accessModes: [],
  interval: undefined,
  features: [],
})

const handleOk = async () => {
  const data = cloneDeep(formData.value)
  const { accessModes, features, interval } = data
  const ischange =
    accessModes.length !== 0 ||
    features.length !== 0 ||
    Number(interval) === 0 ||
    !!interval
  if (ischange) {
    const params = cloneDeep(props.data)
    params.forEach((i: any) => {
      if (accessModes.length !== 0) {
        i.accessModes = data.accessModes
      } else {
        if (isObject(i.accessModes)) {
          i.accessModes = i.accessModes.map((item: any) => item.value)
        }
      }
      if (features.length !== 0) {
        i.features = data.features
      } else {
        i.features = i.features.map((it: any) => it.value)
      }
      if (!!interval || Number(interval) === 0) {
        i.interval = data.interval
        i.configuration = {
          ...i.configuration,
          interval: data.interval,
        }
      }
    })
    loading.value = true
    const response = await savePointBatch(params).catch(() => {})
    emit('change', response?.status === 200)
    loading.value = false
  } else {
    emit('change', true)
  }
}

const handleCancel = () => {
  emit('change', false)
}
</script>

<style lang="less" scoped>
.sizeText {
  margin-bottom: 20px;
}
</style>
