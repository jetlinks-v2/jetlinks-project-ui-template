<template>
  <a-modal title="写入" :visible="true" width="500px" @cancel="handleCancel">
    <a-form
      class="form"
      layout="vertical"
      :model="formData"
      name="basic"
      autocomplete="off"
      ref="formRef"
    >
      <a-form-item
        :label="data.name"
        name="value"
        :rules="[
          {
            required: true,
            message: `请输入${data.name}`,
          },
        ]"
        v-if="
          data.provider === 'MODBUS_TCP' &&
          data?.configuration.function === 'Coils'
        "
      >
        <a-textarea
          placeholder="请输入"
          v-model:value="formData.value"
          :maxlength="200"
          :rows="3"
          showCount
        />
      </a-form-item>
      <a-form-item
        :label="data.name"
        name="value"
        :rules="[
          {
            required: true,
            message: `请输入${data.name}`,
          },
        ]"
        v-else-if="data.provider === 'OPC_UA'"
      >
        <a-input-number
          v-if="
            ['double', 'float', 'llong', 'long', 'integer', 'short'].includes(
              valueType,
            )
          "
          style="width: 100%"
          placeholder="请输入"
          v-model:value="formData.value"
        />
        <a-select
          v-else-if="['boolean'].includes(valueType)"
          style="width: 100%"
          v-model:value="formData.value"
          :options="[
            {
              label: '是',
              value: true,
            },
            {
              label: '否',
              value: false,
            },
          ]"
          placeholder="请选择"
          allowClear
          show-search
          :filter-option="filterOption"
        />
        <a-date-picker
          v-else-if="['datetime'].includes(valueType)"
          style="width: 100%"
          format="YYYY-MM-DD HH:mm:ss"
          show-time
          placeholder="请选择"
          @change="onChange"
        />

        <a-input v-else placeholder="请输入" v-model:value="formData.value" />
      </a-form-item>
      <a-form-item
        :label="data.name"
        name="value"
        :rules="[
          {
            required: true,
            message: `请输入${data.name}`,
          },
        ]"
        v-else-if="data.provider === 'snap7'"
      >
        <a-input-number
          v-if="s7Type.includes(data.configuration?.type)"
          style="width: 100%"
          placeholder="请输入"
          v-model:value="formData.value"
        />
        <a-select
          v-else-if="['Bool'].includes(data.configuration?.type)"
          style="width: 100%"
          v-model:value="formData.value"
          :options="[
            {
              label: '是',
              value: true,
            },
            {
              label: '否',
              value: false,
            },
          ]"
          placeholder="请选择"
          allowClear
          show-search
          :filter-option="filterOption"
        />
        <a-input v-else placeholder="请输入" v-model:value="formData.value" />
      </a-form-item>
      <a-form-item
        :label="data.name"
        name="value"
        :rules="[
          {
            required: true,
            message: `请输入${data.name}`,
          },
        ]"
        v-else
      >
        <a-input-number
          v-if="valueTypeArray.includes(valueType)"
          style="width: 100%"
          placeholder="请输入"
          v-model:value="formData.value"
        />
        <a-select
          v-else-if="['boolean'].includes(valueType)"
          style="width: 100%"
          v-model:value="formData.value"
          :options="[
            {
              label: '是',
              value: true,
            },
            {
              label: '否',
              value: false,
            },
          ]"
          placeholder="请选择"
          allowClear
          show-search
          :filter-option="filterOption"
        />
        <a-date-picker
          v-else-if="['datetime'].includes(valueType)"
          style="width: 100%"
          format="YYYY-MM-DD HH:mm:ss"
          show-time
          placeholder="请选择"
          @change="onChange"
        />

        <a-input v-else placeholder="请输入" v-model:value="formData.value" />
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
import type { Dayjs } from 'dayjs'
import { writePoint } from '@/api/data-collect/collector'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const valueType: string = (
  props.data?.provider === 'OPC_UA'
    ? props?.data?.configuration?.type || 'String'
    : props.data?.configuration?.codec?.provider || 'int8'
).toLocaleLowerCase()

const valueTypeArray = [
  'int8',
  'int16',
  'int32',
  'ieee754_float',
  'ieee754_double',
  'hex,',
  'number',
]

const s7Type = [
  'Byte',
  'Word',
  'DWord',
  'USInt',
  'SInt',
  'Int',
  'UDInt',
  'DInt',
  'Real',
  'LReal',
]

const emit = defineEmits(['change'])
const loading = ref(false)
const formRef = ref<FormInstance>()

const collectorId = props.data.collectorId
const pointId: string = props.data.id

const formData = ref({
  value: '',
})

const onChange = (value: Dayjs, dateString: string) => {
  formData.value.value = dateString
}

const handleOk = async () => {
  const data = await formRef.value?.validate()
  const params: any = {
    ...data,
    pointId,
  }
  loading.value = true
  const response = await writePoint(collectorId, [params]).catch(() => {})
  emit('change', response?.status === 200)
  loading.value = false
}

const handleCancel = () => {
  emit('change', false)
}

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script>

<style lang="less" scoped></style>
