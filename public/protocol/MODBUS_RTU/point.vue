<template>
  <a-form-item :label="$lang('MODBUS_RTU.point.20250207-1')" :name="['configuration', 'function']"
               :rules="[
    {
      required: true,
      message: $lang('MODBUS_RTU.point.20250207-20')
    },
  ]">
    <a-select style="width: 100%" v-model:value="formData.configuration.function" :options="[
  { label: $lang('MODBUS_RTU.point.20250207-27'), value: 'Coils' },
  { label: $lang('MODBUS_RTU.point.20250207-28'), value: 'DiscreteInputs' },
  { label: $lang('MODBUS_RTU.point.20250207-29'), value: 'HoldingRegisters' },
  { label: $lang('MODBUS_RTU.point.20250207-30'), value: 'InputRegisters' },
]"
              :placeholder="$lang('MODBUS_RTU.point.20250207-2')"
              allowClear show-search :filter-option="filterOption" @change="functionChange" />
  </a-form-item>
  <a-form-item :label="$lang('MODBUS_RTU.point.20250207-3')" name="pointKey" :rules="[
    {
      validator: checkPointKey,
      trigger: 'blur',
    },
  ]">
    <a-input-number v-model:value="formData.pointKey" :controls="false" :max="9999999" :maxlength="64" :min="0"
                    :precision="0"
                    :placeholder="$lang('MODBUS_RTU.point.20250207-4')" style="width: 100%" />
    <p v-show="plcFormat" style="margin: 10px 0; color: #616161">
      PLC地址：{{ formData.pointKey != undefined ? plcFormat : '' }}
    </p>
  </a-form-item>
  <a-form-item v-if="showProvider" :name="['configuration', 'codec', 'provider']" :rules="[
    {
      required: true,
      message: $lang('MODBUS_RTU.point.20250207-23')
    },
    {
      validator: checkProvider,
      trigger: 'change',
    },
  ]" :label="$lang('MODBUS_RTU.point.20250207-35')">
    <a-select v-model:value="formData.configuration.codec.provider" :options="filterProvOptions" :placeholder="$lang('MODBUS_RTU.point.20250207-23')"
              show-search @change="providerChange" />
  </a-form-item>

  <a-form-item :name="['configuration', 'parameter', 'quantity']"
               :rules="[
    {
      required: true,
      message: $lang('MODBUS_RTU.point.20250207-7')
    },
    {
      pattern: new RegExp(/^\d+$/),
      message: $lang('MODBUS_RTU.point.20250207-22')
    },
  ]"
               :label="$lang('MODBUS_RTU.point.20250207-6')">
    <a-input-number v-model:value="formData.configuration.parameter.quantity" :controls="false" :max="65535" :min="1"
                    :precision="0"
                    :placeholder="$lang('MODBUS_RTU.point.20250207-7')" style="width: 100%" />
  </a-form-item>

  <a-form-item v-if="showScaleFactor" :name="[
    'configuration',
    'codec',
    'configuration',
    'scaleFactor',
  ]"
               :label="$lang('MODBUS_RTU.point.20250207-8')">
    <a-input-number v-model:value="formData.configuration.codec.configuration.scaleFactor" :controls="false" :max="65535"
                    :maxlength="64"
                    :placeholder="$lang('MODBUS_RTU.point.20250207-9')" style="width: 100%" type="number" />
  </a-form-item>
  <a-form-item v-if="showCodecProvider" :name="['configuration', 'codec', 'configuration', 'scale']"
               :label="$lang('MODBUS_RTU.point.20250207-10')">
    <a-input-number v-model:value="formData.configuration.codec.configuration.scale" :controls="false" :max="65535"
                    :maxlength="64" :min="0" :precision="0"
                    :placeholder="$lang('MODBUS_RTU.point.20250207-11')" style="width: 100%" type="number" />
  </a-form-item>
  <div v-if="showWriteByteConfig">
    <a-form-item style="
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0;
          ">
      <a-form-item-rest>
        <span>{{ $lang('MODBUS_RTU.point.20250207-12') }}</span>
      </a-form-item-rest>
      <a-switch v-model:checked="writeByteConfig" style="margin-left: 20px" />
    </a-form-item>
    <a-form-item v-if="writeByteConfig" :name="['configuration', 'parameter', 'writeByteCount']"
                 :rules="[
    {
      required: true,
      message: $lang('MODBUS_RTU.point.20250207-24')
    },
  ]"
                 :label="$lang('MODBUS_RTU.point.20250207-13')">
      <a-radio-group v-model:value="formData.configuration.parameter.writeByteCount">
        <a-space>
          <a-radio-button :value="true">{{ $lang('MODBUS_RTU.point.20250207-14') }}</a-radio-button>
          <a-radio-button :value="false">{{ $lang('MODBUS_RTU.point.20250207-15') }}</a-radio-button>
        </a-space>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-if="writeByteConfig" :name="['configuration', 'parameter', 'byteCount']" :rules="[
    {
      required: true,
      message: $lang('MODBUS_RTU.point.20250207-16')
    },
  ]"
                 :label="$lang('MODBUS_RTU.point.20250207-16-1')">
      <a-input :placeholder="$lang('MODBUS_RTU.point.20250207-16')" v-model:value="formData.configuration.parameter.byteCount" />
    </a-form-item>
  </div>
  <a-form-item :rules="[
    {
      required: true,
      message: $lang('MODBUS_RTU.point.20250207-5')
    },
  ]" :label="$lang('MODBUS_RTU.point.20250207-17')" name="accessModes">
    <j-check-button v-model:value="formData.accessModes" :multiple="true" :options="accessModesOptions" />
  </a-form-item>
</template>
<script setup>
import { computed, inject, ref, watch } from 'vue'
import { request } from '@jetlinks-web/core'
import {useLocales} from '@hooks'

const {$lang} = useLocales('MODBUS_RTU')
const formData = inject('plugin-form', {
  accessModes: [],
  pointKey: undefined,
})

const collectorData = inject('plugin-form-collector', {})

const provOptions = ref([])

const writeByteConfig = ref(false);

if (!('configuration' in formData)) {
  formData.configuration = {
    function: undefined,
    interval: 3000,
    parameter: {
      quantity: 1,
      writeByteCount: undefined,
      byteCount: 2,
      address: undefined,
    },
    codec: {
      provider: undefined,
      configuration: {
        scaleFactor: 1,
        scale: undefined,
      },
    },
  }
}

if (!('parameter' in formData.configuration)) {
  formData.configuration.parameter = {
    quantity: 1,
    writeByteCount: undefined,
    byteCount: 2,
    address: undefined,
  }
}

if (!('codec' in formData.configuration)) {
  formData.configuration.codec = {
    provider: undefined,
    configuration: {
      scaleFactor: 1,
      scale: undefined,
    },
  }
}

if (!('pointKey' in formData)) {
  formData.pointKey = undefined
}

if (!('accessModes' in formData)) {
  formData.accessModes = []
}

const oldPointKey = formData.pointKey;

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const showProvider = computed(() => {
  return ['HoldingRegisters', 'InputRegisters'].includes(formData.configuration.function)
})

const checkProviderData = {
  int8: 1,
  int16: 2,
  int32: 4,
  int64: 8,
  ieee754_float: 2,
  ieee754_double: 8,
  hex: 1,
};

const getOptions = () => {
  request.get('/things/collector/codecs', {}).then(resp => {

    provOptions.value = resp.result
      .filter((i) => i.id !== 'property' && i.id !== 'bool')
      .map((item) => ({
        value: item.id,
        label: item.name,
      }))
  })
}

const checkProvider = (_rule, value) =>
  new Promise(async (resolve, reject) => {
    if (value) {
      const { quantity } = formData.configuration.parameter;
      return checkProviderData[value] > Number(quantity) * 2
        ? reject($lang('MODBUS_RTU.point.20250207-31'))
        : resolve('');
    } else {
      return reject('');
    }
  });

function checkPointKey (_rule, value) {
  return new Promise(async (resolve, reject) => {
    if (value || value === 0) {
      const reg = new RegExp(/^\d+$/)
      if (!reg.test(value)) {
        return reject($lang('MODBUS_RTU.point.20250207-32'))
      }

      if (Number(oldPointKey) === Number(value)) return resolve('');
      if (typeof value === 'object') return resolve('');
      const res = await request.get(`/data-collect/point/${collectorData.id}/_validate`, {
        pointKey: value,
      });
      return res.result?.passed ? resolve('') : reject(res.result.reason);
    } else {
      return reject($lang('MODBUS_RTU.point.20250207-4'));
    }
  });
}


const plcFormat = computed(() => {
  let result = parseInt(formData.pointKey);
  switch (formData.configuration.function) {
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

const accessModesOptions = computed(() => {
  return formData.configuration.function === 'InputRegisters' ||
  formData.configuration.function === 'DiscreteInputs'
    ? [{ label: $lang('MODBUS_RTU.point.20250207-33'), value: 'read' }]
    : [
      { label: $lang('MODBUS_RTU.point.20250207-33'), value: 'read' },
      { label: $lang('MODBUS_RTU.point.20250207-34'), value: 'write' },
    ]
})

const showScaleFactor = computed(() => {
  return formData.configuration.codec.provider?.indexOf('int') !== -1 ||
    formData.configuration.codec.provider?.indexOf('float') !== -1 ||
    formData.configuration.codec.provider?.indexOf('double') !== -1
})

const showCodecProvider = computed(() => !['hex', 'bool'].includes(formData.configuration.codec.provider))

const showWriteByteConfig = computed(() => formData.configuration.function === 'HoldingRegisters' && formData.accessModes.includes('write'))


const filterProvOptions = computed(() => {
  let result = [];
  switch (true) {
    case ['Coils', 'DiscreteInputs'].includes(formData.configuration.function):
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
  ieee754_float: 2,
  bool: 1,
}

const providerChange = (val) => {
  console.log('providerValueMap[val]====',providerValueMap[val],providerValueMap);
  formData.configuration.parameter.quantity = providerValueMap[val]

  if (val === 'bool') {
    formData.configuration.codec.configuration.scaleFactor = undefined;
    formData.configuration.codec.configuration.scale = undefined;
  }
};

const functionChange = (v) => {
  formData.accessModes = [];
  if (!['HoldingRegisters', 'InputRegisters'].includes(formData.configuration.function)) {
    formData.configuration.codec.provider = 'int8'
  } else {
    formData.configuration.codec.provider = undefined
  }
};

getOptions()

watch(
  () => writeByteConfig.value,
  (val) => {
    if (
      val &&
      !formData.configuration.parameter.byteCount &&
      formData.configuration.parameter.quantity
    ) {
      formData.configuration.parameter.byteCount = formData.configuration.parameter.quantity * 2;
    }
  },
);

watch(
  () => formData.configuration.parameter?.byteCount,
  () => {
    if (formData.configuration.parameter?.byteCount) {
      writeByteConfig.value = true;
    }
  },
  { deep: true },
);

</script>
<style></style>
