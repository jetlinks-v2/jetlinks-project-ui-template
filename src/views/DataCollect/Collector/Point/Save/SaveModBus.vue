<template>
  <a-modal
    :title="data.id ? '编辑' : '新增'"
    :visible="true"
    width="700px"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :rules="ModBusRules"
      autocomplete="off"
      class="form"
      layout="vertical"
      name="basic"
    >
      <a-form-item label="点位名称" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入点位名称" />
      </a-form-item>
      <a-form-item
        :name="['configuration', 'function']"
        :rules="ModBusRules.function"
        label="功能码"
      >
        <a-select
          v-model:value="formData.configuration.function"
          :filter-option="filterOption"
          :options="[
            { label: '01线圈寄存器', value: 'Coils' },
            { label: '02离散输入寄存器', value: 'DiscreteInputs' },
            { label: '03保存寄存器', value: 'HoldingRegisters' },
            { label: '04输入寄存器', value: 'InputRegisters' },
          ]"
          allowClear
          placeholder="请选择所功能码"
          show-search
          style="width: 100%"
          @change="changeFunction"
        />
      </a-form-item>
      <a-form-item
        :name="['pointKey']"
        :rules="[
          ...ModBusRules.pointKey,
          {
            validator: checkPointKey,
            trigger: 'blur',
          },
        ]"
        label="地址"
        validateFirst
      >
        <a-input-number
          v-model:value="formData.pointKey"
          :max="999999"
          :min="0"
          :precision="0"
          placeholder="请输入地址"
          style="width: 100%"
        />
      </a-form-item>
      <p v-if="formData.configuration.function" style="color: #616161">
        PLC地址:
        {{
          InitAddress[formData.configuration.function] +
            Number(formData.pointKey) || 0
        }}
      </p>
      <a-form-item
        :name="['configuration', 'parameter', 'quantity']"
        :rules="ModBusRules.quantity"
        label="寄存器数量"
      >
        <a-input-number
          v-model:value="formData.configuration.parameter.quantity"
          :max="255"
          :min="1"
          :precision="0"
          placeholder="请输入寄存器数量"
          style="width: 100%"
          @blur="changeQuantity"
        />
      </a-form-item>

      <a-form-item
        v-if="
          ['HoldingRegisters', 'InputRegisters'].includes(
            formData.configuration.function,
          )
        "
        :name="['configuration', 'codec', 'provider']"
        :rules="[
          ...ModBusRules.provider,
          {
            validator: checkProvider,
            trigger: 'change',
          },
        ]"
        label="数据类型"
      >
        <a-select
          v-model:value="formData.configuration.codec.provider"
          :filter-option="filterOption"
          :options="providerList"
          allowClear
          placeholder="请选择数据类型"
          show-search
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        :name="['configuration', 'codec', 'configuration', 'scaleFactor']"
        :rules="ModBusRules.scaleFactor"
        label="缩放因子"
      >
        <a-input-number
          v-model:value="formData.configuration.codec.configuration.scaleFactor"
          placeholder="请输入缩放因子"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        :name="['configuration', 'codec', 'configuration', 'scale']"
        label="小数保留位数"
      >
        <a-input-number
          v-model:value="formData.configuration.codec.configuration.scale"
          :max="65535"
          :min="0"
          :precision="0"
          placeholder="请输入小数保留位数"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        v-if="formData.configuration.function"
        label="访问类型"
        name="accessModes"
      >
        <j-card-select
          v-model:value="formData.accessModes"
          :column="2"
          :options="
            formData.configuration.function === 'InputRegisters' ||
            formData.configuration.function === 'DiscreteInputs'
              ? [{ label: '读', value: 'read' }]
              : [
                  { label: '读', value: 'read' },
                  { label: '写', value: 'write' },
                ]
          "
          :showImage="false"
          multiple
        />
      </a-form-item>
      <a-form-item
        v-if="
          formData.accessModes?.includes('write') &&
          formData.configuration.function === 'HoldingRegisters'
        "
        :name="['nspwc']"
      >
        <span style="margin-right: 10px">非标准协议写入配置</span>
        <a-switch v-model:checked="formData.nspwc" @change="changeNspwc" />
      </a-form-item>
      <a-form-item
        v-if="
          !!formData.nspwc &&
          formData.accessModes?.includes('write') &&
          formData.configuration.function === 'HoldingRegisters'
        "
        :name="['configuration', 'parameter', 'writeByteCount']"
        :rules="ModBusRules.writeByteCount"
        label="是否写入数据区长度"
      >
        <j-card-select
          v-model:value="formData.configuration.parameter.writeByteCount"
          :column="2"
          :options="[
            { label: '是', value: true },
            { label: '否', value: false },
          ]"
          :showImage="false"
          @change="changeWriteByteCount"
        />
      </a-form-item>
      <a-form-item
        v-if="
          !!formData.nspwc &&
          formData.accessModes?.includes('write') &&
          formData.configuration.function === 'HoldingRegisters'
        "
        :name="['configuration', 'parameter', 'byteCount']"
        :rules="ModBusRules.byteCount"
        label="自定义数据区长度（byte）"
      >
        <a-input
          v-model:value="formData.configuration.parameter.byteCount"
          placeholder="请输入自定义数据区长度（byte）"
        />
      </a-form-item>
      <a-form-item
        :name="['configuration', 'interval']"
        :rules="[...ModBusRules.interval]"
        label="采集频率"
      >
        <a-input-number
          v-model:value="formData.configuration.interval"
          :max="2147483648"
          :min="0"
          addon-after="ms"
          placeholder="请输入采集频率"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item :name="['features']" label="">
        <a-checkbox-group v-model:value="formData.features">
          <a-checkbox name="type" value="changedOnly"
            >只推送变化的数据
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>

      <a-form-item :name="['description']" label="说明">
        <a-textarea
          v-model:value="formData.description"
          :maxlength="200"
          :rows="3"
          placeholder="请输入说明"
          showCount
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <j-permission-button
        key="submit"
        :hasPermission="`DataCollect/Collector:${id ? 'update' : 'add'}`"
        :loading="loading"
        style="margin-left: 8px"
        type="primary"
        @click="handleOk"
      >
        确认
      </j-permission-button>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import {
  savePointBatch,
  updatePoint,
  _validateField,
  queryCodecProvider,
} from '@/api/data-collect/collector'
import { ModBusRules, checkProviderData } from '../../data.ts'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/lib/form'
import { cloneDeep, omit } from 'lodash-es'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['change'])
const loading = ref(false)
const providerListAll: any = ref([])
const providerList: any = ref([])
const formRef = ref<FormInstance>()

const id = props.data.id
const collectorId = props.data.collectorId
const provider = props.data.provider
const oldPointKey = props.data.pointKey

const InitAddress = {
  Coils: 1,
  DiscreteInputs: 10001,
  HoldingRegisters: 40001,
  InputRegisters: 30001,
}

const formData = ref({
  name: '',
  configuration: {
    function: undefined,
    interval: 3000,
    parameter: {
      quantity: 1,
      writeByteCount: '',
      byteCount: 2,
      address: '',
    },
    codec: {
      provider: undefined,
      configuration: {
        scaleFactor: 1,
        scale: undefined,
      },
    },
  },
  pointKey: undefined,
  accessModes: [],
  nspwc: false,
  features: [],
  description: '',
})

const handleOk = async () => {
  const data = await formRef.value?.validate()
  delete data?.nspwc
  const { codec } = data?.configuration

  if (
    !['HoldingRegisters', 'InputRegisters'].includes(
      data?.configuration.function,
    )
  ) {
    codec.provider = 'int8'
  }
  const { interval } = formData.value.configuration
  const params = {
    ...props.data,
    ...data,
    provider,
    collectorId,
    interval,
  }

  // address是多余字段，但是react版本上使用到了这个字段
  params.configuration.parameter = {
    ...params.configuration.parameter,
    address: data?.pointKey,
  }

  if (props.data.provider === 'COLLECTOR_GATEWAY') {
    const configuration = cloneDeep(params.configuration)
    params.configuration = {
      configuration: configuration,
      interval: params.interval,
    }
  }

  loading.value = true
  const response = !id
    ? await savePointBatch(params).catch(() => {})
    : await updatePoint(id, { ...props.data, ...params }).catch(() => {})
  emit('change', response?.status === 200)
  loading.value = false
}

const handleCancel = () => {
  emit('change', false)
}

const changeQuantity = () => {
  const { configuration, nspwc } = formData.value
  if (configuration.function === 'HoldingRegisters') {
    formRef.value?.validate()
  }
  if (nspwc) {
    configuration.parameter.byteCount =
      Number(configuration.parameter.quantity) * 2
  }
}
const changeNspwc = (value: boolean) => {
  const { configuration } = formData.value
  if (value) {
    configuration.parameter.byteCount =
      Number(configuration.parameter.quantity || 0) * 2
  }
}
const changeWriteByteCount = (value: Array<string>) => {
  formData.value.configuration.parameter.writeByteCount = value[0]
}
const changeFunction = (value: string) => {
  formData.value.accessModes = ['InputRegisters', 'DiscreteInputs'].includes(
    value,
  )
    ? ['read']
    : ['read', 'write']
}

const checkProvider = (_rule: Rule, value: string): Promise<any> =>
  new Promise(async (resolve, reject) => {
    if (value) {
      const { quantity } = formData.value.configuration.parameter
      return checkProviderData[value] > Number(quantity) * 2
        ? reject('数据类型长度需 <= 寄存器数量 * 2')
        : resolve('')
    } else {
      return reject('')
    }
  })

const checkPointKey = (_rule: Rule, value: string): Promise<any> =>
  new Promise(async (resolve, reject) => {
    if (value || Number(value) === 0) {
      if (Number(oldPointKey) === Number(value)) return resolve('')
      if (typeof value === 'object') return resolve('')
      const res: any = await _validateField(collectorId, {
        pointKey: value,
      })
      return res.result?.passed ? resolve('') : reject(res.result.reason)
    } else {
      return reject('请输入地址')
    }
  })

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const getProviderList = async () => {
  const res: any = await queryCodecProvider()
  providerListAll.value = res.result
    .filter((i: any) => i.id !== 'property' && i.id !== 'bool')
    .map((item: any) => ({
      value: item.id,
      label: item.name,
    }))
  setProviderList(formData.value.configuration.function)
}
getProviderList()

const setProviderList = (value: string | undefined) => {
  providerList.value = providerListAll.value
}

watch(
  () => formData.value.configuration.function,
  (value) => {
    setProviderList(value)
  },
  { immediate: true, deep: true },
)
watch(
  () => props.data,
  (value) => {
    if (
      value.id &&
      ['MODBUS_TCP', 'COLLECTOR_GATEWAY'].includes(value.provider)
    ) {
      const _value: any = cloneDeep(value)
      const { writeByteCount, byteCount } =
        props.data.provider === 'COLLECTOR_GATEWAY'
          ? _value.configuration.configuration.parameter
          : _value.configuration.parameter

      if (props.data.provider === 'COLLECTOR_GATEWAY') {
        formData.value = {
          ...omit(_value, ['configuration']),
          ..._value.configuration,
        }
      } else {
        formData.value = _value
      }

      if (!!_value.accessModes[0]?.value) {
        formData.value.accessModes = value.accessModes.map((i: any) => i.value)
      }
      if (!!_value.features[0]?.value) {
        formData.value.features = value.features.map((i: any) => i.value)
      }
      formData.value.nspwc = !!writeByteCount || !!byteCount
    }
  },
  { immediate: true, deep: true },
)
</script>

<style lang="less" scoped></style>
