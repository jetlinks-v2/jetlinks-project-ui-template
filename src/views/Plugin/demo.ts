export default `<template>
  <a-form-item label="功能码" name="function">
    <a-select
      v-model:value="formData.function"
      :options="options"
      placeholder="请选择功能码"
      show-search
      @change="functionChange"
    />
  </a-form-item>
  <a-form-item label="地址" name="pointKey">
    <a-input-number
      v-model:value="formData.pointKey"
      :controls="false"
      :max="9999999"
      :maxlength="64"
      :min="0"
      :precision="0"
      placeholder="请输入地址"
      style="width: 100%"
      type="number"
    />
    <p v-show="plcFormat" style="margin: 10px 0; color: #999999">
      PLC地址：{{ formData.pointKey != undefined ? plcFormat : '' }}
    </p>
  </a-form-item>
  <a-form-item
    :name="['codec', 'provider']"
    :rules="{
        required: true,
        message: '请选择数据类型',
        trigger: 'blur',
      }"
    label="数据类型"
  >
    <a-select
      v-model:value="formData.codec.provider"
      :options="filterProvOptions"
      placeholder="请选择数据类型"
      show-search
      @change="providerChange"
    />
  </a-form-item>
  <a-form-item
    v-if="showFormat"
    :name="['codec', 'format']"
  >
    <a-radio-group v-model:value="formData.codec.configuration.format">
      <a-radio value="signed">有符号</a-radio>
      <a-radio value="unsigned">无符号</a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item
    :name="['parameter', 'quantity']"
    :rules="rules.quantity"
    label="寄存器数量（word）"
  >
    <a-input-number
      v-model:value="formData.parameter.quantity"
      :controls="false"
      :disabled="['Coils', 'bool'].includes(formData.function)"
      :max="65535"
      :maxlength="64"
      :min="1"
      :precision="0"
      placeholder="请输入寄存器数量"
      style="width: 100%"
      type="number"
    />
  </a-form-item>
    <a-form-item
    v-if="showBits"
    :name="['codec', 'configuration', 'bits']"
    :rules="rules.bits"
    label="位号"
  >
    <a-input-number
      v-model:value="formData.codec.configuration.bits"
      :controls="false"
      :disabled="bitsDisabled"
      :max="15"
      :maxlength="64"
      :min="
          ['Coils', 'DiscreteInputs'].includes(formData.function) ? -1 : 0
        "
      placeholder="请输入位号"
      style="width: 100%"
      type="number"
    />
  </a-form-item>
  <a-form-item
    v-if="showScaleFactor"
    :name="['codec', 'configuration', 'scaleFactor']"
    label="缩放因子"
  >
    <a-input-number
      v-model:value="formData.codec.configuration.scaleFactor"
      :controls="false"
      :max="65535"
      :maxlength="64"
      placeholder="请输入缩放因子"
      style="width: 100%"
      type="number"
    />
  </a-form-item>
  <a-form-item
    v-if="showCodecProvider"
    :name="['codec', 'configuration', 'scale']"
    label="小数保留位数"
  >
    <a-input-number
      v-model:value="formData.codec.configuration.scale"
      :controls="false"
      :max="65535"
      :maxlength="64"
      :min="0"
      :precision="0"
      placeholder="请输入小数保留位数"
      style="width: 100%"
      type="number"
    />
  </a-form-item>
  <a-form-item label="内存布局">
    <a-switch v-model:checked="isMemoryLayout"></a-switch>
      <a-row :gutter="20" v-if="isMemoryLayout">
        <a-col>
          <a-form-item
            :rules="[{ required: true, message: '请选择高低位' }]"
            label="双字高低位切换"
            name="endian"
            style="margin-bottom: 0px"
          >
            <j-check-button v-model="formData.endian" :options="endianOptions"/>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item
            :rules="[{ required: true, message: '请选择高低位' }]"
            label="单字高低位切换"
            name="endianIn"
            style="margin-bottom: 0px"
          >
            <j-check-button
              v-model="formData.endianIn"
              :options="endianOptions"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <p v-if="isMemoryLayout" class="plugin-modbus-tcp-tip">当前内存布局：{{ memoryLayout }}</p>
      <p v-if="isMemoryLayout" class="plugin-modbus-tcp-tip">
        只有4字节数据类型（int32、ieee754_float）具有4种内存布局，其它只有ABCD、DCBA两种内存布局（以双字配置为准）
      </p>
  </a-form-item>
  <div v-if="showWriteByteConfig"  >
    <a-form-item
      style="
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0;
          "
    >
      <a-form-item-rest>
        <span>非标准协议写入配置</span>
      </a-form-item-rest>
      <a-switch
        v-model:checked="writeByteConfig"
        style="margin-left: 20px"
      />
    </a-form-item>
      <a-form-item
      v-if="writeByteConfig"
        :name="['parameter', 'writeByteCount']"
        :rules="{
              required: true,
              message: '请选择是否写入数据区长度',
              trigger: 'blur',
            }"
        label="是否写入数据区长度"
      >
        <a-radio-group v-model:value="formData.parameter.writeByteCount">
          <a-space>
            <a-radio-button :value="true">是</a-radio-button>
            <a-radio-button :value="false">否</a-radio-button>
          </a-space>
        </a-radio-group>
      </a-form-item>
      <a-form-item
      v-if="writeByteConfig"
        :name="['parameter', 'byteCount']"
        :rules="{
              required: true,
              message: '请输入自定义数据区长度',
              trigger: 'blur',
            }"
        label="自定义数据区长度（byte）"
      >
        <a-input-number
          v-model:value="formData.parameter.byteCount"
          :controls="false"
          :max="65535"
          :maxlength="64"
          :min="1"
          :precision="0"
          placeholder="请输入写入字节数"
          style="width: 100%"
          type="number"
        />
      </a-form-item>
  </div>
  <a-form-item :rules="rules.accessModes" label="访问类型" name="accessModes">
    <j-check-button
      v-model:value="formData.accessModes"
      :multiple="true"
      :options="[
          { label: '读', value: 'read' },
          { label: '写', value: 'write' },
        ]"
    />
  </a-form-item>
</template>
<script setup>
import {computed, inject, ref, watch} from 'vue'
import { useRequest } from '@jetlinks-web/hooks'
import { request } from '@jetlinks-web/core'

const formData = inject('plugin-form', {
  accessModes: [],
  pointKey: undefined,
  function: undefined,
})

const { data: provOptions } = useRequest(request.post('/edge/operations/local/data-collector-codecs-list/invoke'), {
  onSuccess: (resp) => resp.result?.[0] || []
})

if (!('codec' in formData)) {
  formData.codec = {
    provider: undefined,
    configuration: {
      format: 'signed',
      scaleFactor: undefined,
      scale: undefined,
      bits: undefined
    }
  }
}

if (!('configuration' in formData.codec)) {
  formData.codec.configuration = {
    format: 'signed',
    scaleFactor: undefined,
    scale: undefined
  }
}

if (!('parameter' in formData)) {
  formData.parameter = {
    byteCount: undefined,
    quantity: undefined,
    writeByteCount: undefined,
  }
}

const rules = {
  function: [{ message: '请选择功能码', required: true}],
  bits: [{ message: '请输入位号', required: true}],
  quantity: [{ message: '请输入非0正整数', required: true}],
  pointKey: [{required: true, trigger: 'blur', message: '请输入地址'}],
}

const options = [
  {label: '线圈寄存器（读：01 写：05）', value: 'Coils'},
  {label: '离散输入寄存器（读：02）', value: 'DiscreteInputs'},
  {label: '保存寄存器（读：03 写：10）', value: 'HoldingRegisters'},
  {label: '输入寄存器（读：04）', value: 'InputRegisters'},
]

const endianOptions = [
  {
    label: 'AB',
    value: 'BIG',
    tip: '',
  },
  {
    label: 'BA',
    value: 'LITTLE',
    tip: '',
  },
];

const isMemoryLayout = ref(false)
const writeByteConfig = ref(false);

const plcFormat = computed(() => {
  let result = parseInt(formData.pointKey);
  switch (formData.function) {
    case 'Coils':
      result += 1;
      break;
    case 'HoldingRegisters':
      result += 40001;
      break;
    case 'InputRegisters':
      result += 30001;
      break;
  }
  return result ?? undefined;
});

const showFormat = computed(() => {
    return ['int8', 'int16', 'int32'].includes(formData.codec.provider) && !['Coils', 'DiscreteInputs'].includes(formData.function)
})

const showBits = computed(() => {
  return formData.codec.provider?.indexOf('bool') !== -1
})

const bitsDisabled = computed(() => {
    return ['Coils', 'DiscreteInputs'].includes(formData.function) && formData.codec.provider === 'bool'
})

const showScaleFactor = computed(() => {
    return formData.codec.provider?.indexOf('int') !== -1 ||
        formData.codec.provider?.indexOf('float') !== -1 ||
        formData.codec.provider?.indexOf('double') !== -1
})

const showCodecProvider = computed(() => !['hex', 'bool'].includes(formData.codec.provider))

const showWriteByteConfig = computed(() => formData.function === 'HoldingRegisters' && formData.accessModes.includes('write'))

const memoryLayout = computed(() => {
  let result = '';
  switch (true) {
    case formData.configuration?.endian === 'BIG' &&
    formData.configuration?.endianIn === 'BIG':
      result = 'ABCD';
      break;
    case formData.configuration?.endian === 'BIG' &&
    formData.configuration?.endianIn === 'LITTLE':
      result = 'BADC';
      break;
    case formData.configuration?.endian === 'LITTLE' &&
    formData.configuration?.endianIn === 'BIG':
      result = 'CDAB';
      break;
    case formData.configuration?.endian === 'LITTLE' &&
    formData.configuration?.endianIn === 'LITTLE':
      result = 'DCBA';
      break;
  }
  return result;
});

const filterProvOptions = computed(() => {
  let result = [];
  switch (true) {
    case ['Coils', 'DiscreteInputs'].includes(formData.function):
      result = provOptions.value.filter((item) => {
        return ['int8', 'bool'].includes(item.value);
      });
      break;
    default:
      result = provOptions.value;
      break;
  }
  return result;
})

const providerValueMap = {
  int8: 1,
  int16: 1,
  int32: 2,
  int64: 4,
  ieee754_float: 4,
  bool: 1,
}

const providerChange = (val) => {

  formData.parameter.quantity = providerValueMap[val]

  if (val === 'bool') {
    formData.codec.configuration.scaleFactor = undefined;
    formData.codec.configuration.scale = undefined;

    if (['Coils', 'DiscreteInputs'].includes(formData.function)) {
      formData.codec.configuration.bits = -1;
    }
  }
};

const functionChange = () => {
  formData.codec.configuration.bits = undefined;
  formData.codec.provider = formData.codec.provider
    ? filterProvOptions.value[0].value
    : null;
};

watch(
  () => writeByteConfig.value,
  (val) => {
    if (
      val &&
      !formData.parameter.byteCount &&
      formData.parameter.quantity
    ) {
      formData.parameter.byteCount = formData.parameter.quantity * 2;
    }
  },
);

watch(
  () => formData.parameter?.byteCount,
  () => {
    if (formData.parameter?.byteCount) {
      writeByteConfig.value = true;
    }
  },
  { deep: true },
);

<\/script>
<style>
.plugin-modbus-tcp-tip {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
<\/style>
`

const detail = `<template>
<a-descriptions bordered :column="3">
    <a-descriptions-item label="详情字段1">{{ detail.value1 }}</a-descriptions-item>
    <a-descriptions-item label="详情字段2">{{ detail.value2 }}</a-descriptions-item>
    <a-descriptions-item label="详情字段3">{{ detail.value3 }}</a-descriptions-item>
</a-descriptions>
</template>
<script setup>
    import { reactive } from 'vue'
    const detail = reactive({
        value1: 'value1',
        value2: 'value2',
        value3: 'value3',
    })
<\/script>
<style>

<\/style>`

const form = `<template>
<a-form-item label="Modbus主机IP" :name="['configuration', 'host']">
          <a-input
              placeholder="请输入Modbus主机IP"
              v-model:value="formData.configuration.host"
            />
        </a-form-item>
        <a-form-item label="字段名称" :name="['configuration', 'port']">
          <a-input-number
              style="width: 100%"
              placeholder="请输入端口"
              v-model:value="formData.configuration.port"
              :min="0"
              :max="65535"
            />
        </a-form-item>
</template>
<script setup>
    import { inject } from 'vue'
    const formData = inject('plugin-form', {configuration: {}})
<\/script>
<style>

<\/style>`

const table = `<template>
    <j-pro-table :columns="columns" :dataSource="dataSource"></j-pro-table>
</template>
<script setup>

<\/script>
`

const defaultModule = `<template>
    
</template>
<script setup>

<\/script>
`

export const module_table = {
    code: `<j-pro-table :columns="columns" :dataSource="dataSource" />`,
    script: `const columns = [
    { dataIndex: 'key1', title: '字段1' }, 
    { dataIndex: 'key2', title: '字段2' }
    ]
    const dataSource = ref([{ key1: '测试key11', key2: '测试key21'}, { key1: '测试key12', key2: '测试key22'}])
    `
}

export const module_search = {
    code: `<j-search
        :columns="columns"
      />`
}

export const codeView = `<template>
    <a-form layout="vertical">
       <a-form-item label="通道名称" name="name">
        <a-skeleton-input style="width: 100%" />
      </a-form-item>
      <a-form-item label="通讯协议" name="provider">
        <a-select style="width: 100%" :options="options" @select="onSelect" />
      </a-form-item>
      <a-form-item label="自定插件位置" name="provider">
        <a-skeleton-input style="width: 100%" />
      </a-form-item>
      <a-form-item label="说明" name="provider">
        <a-skeleton-input style="width: 100%; height: 120px" />
      </a-form-item>
</a-form>
</template>
<script setup>
import { ref, inject } from 'vue'

const content = inject('plugin-content')
const options = ref([{ label: 'OPC_UA', value: 'OPC_UA'}, { label: 'MODBUS_TCP', value: 'MODBUS_TCP'}, { label: 'COLLECTOR_GATEWAY', value: 'COLLECTOR_GATEWAY' },{ label: 'S7', value: 'snap7' }])

const onSelect = (e) => {
    content.record.observe = e
}

<\/script>
`
export const insertContentMap = {
    defaultModule, detail, form, table, module_table, module_search
}

const demoExtra = `
  
  
  
`
