<template>
  <div class="top">
    <a-switch v-model:checked="deathArea" @change="handleDeathArea"></a-switch>
  </div>
  <div v-if="deathArea">
    <div class="content">
      <a-radio-group v-model:value="tag" @change="handleTag">
        <a-space>
          <a-radio-button value="currentValue">固定值</a-radio-button>
          <a-radio-button value="this['currentValue'] - this['lastValue']"
            >百分比
          </a-radio-button>
        </a-space>
      </a-radio-group>
      <a-tooltip
        v-if="tag !== 'currentValue'"
        title="最近一次采集到的值与上一次采集值比对，数值浮动在百分比以内时将被过滤"
      >
        <AIcon
          style="margin-left: 10px; font-size: 18px; color: rgb(153, 153, 153)"
          type="QuestionCircleOutlined"
        />
      </a-tooltip>
    </div>
    <a-form-item-rest>
      <div v-if="tag === 'currentValue'" class="fixed">
        <a-row :gutter="5" align="middle">
          <a-col>
            <a-input-number
              v-model:value="_value[0].value"
              :max="_value[1] ? _value[1].value : 999999"
              :min="1"
              placeholder="请输入值"
              style="width: 100%"
              @change="handleChange"
            />
          </a-col>
          <a-col>
            <a-select
              v-model:value="_value[0].termType"
              :options="_value.length !== 2 ? termTypeOptions : leftOptions"
              :showArrow="false"
              placeholder="符号"
              @change="handleChange"
            />
          </a-col>
          <template v-if="swap === 'range'">
            <a-col>点位值</a-col>
            <a-col>
              <a-select
                v-model:value="_value[1].termType"
                :options="termTypeOptions"
                :showArrow="false"
                placeholder="符号"
                @change="handleChange"
              />
            </a-col>
            <a-col>
              <a-input-number
                v-model:value="_value[1].value"
                :min="_value[0].value"
                placeholder="请输入值"
                style="width: 100%"
                @change="handleChange"
              />
            </a-col>
          </template>
          <a-button @click="handleSwap">
            <AIcon type="SwapOutlined" />
          </a-button>
        </a-row>
      </div>
      <div v-else class="percent">
        <div class="percent-title">点位值</div>
        <a-input-number
          v-model:value="percentValue"
          :max="65535"
          :min="1"
          addon-after="%"
          placeholder="请输入值"
          style="width: 200px"
          @change="handlePercent"
        />
      </div>
    </a-form-item-rest>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'ant-design-vue'

const formItemContext = Form.useInjectFormItemContext()

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['update:value', 'change'])
const _value = ref<any>(props.value)
const deathArea = ref(false)
const tag = ref<string>('currentValue')
const swap = ref<string>('fix')
const percentValue = ref()

const termTypeOptions = computed(() => {
  if (_value.value?.length === 1) {
    return [
      { label: '=', value: 'neq' },
      { label: '>', value: 'lte' },
      { label: '<', value: 'gte' },
      { label: '≥', value: 'lt' },
      { label: '≤', value: 'gt' },
    ]
  } else {
    return [
      { label: '<', value: 'gte' },
      { label: '≤', value: 'gt' },
    ]
  }
})

const leftOptions = [
  { label: '<', value: 'lte' },
  { label: '≤', value: 'lt' },
]

const handleDeathArea = (e: any) => {
  if (e) {
    _value.value = [
      {
        column: 'currentValue',
        value: undefined,
        termType: undefined,
        type: 'and',
      },
    ]
  } else {
    _value.value = []
  }
  handleChange()
}

const handleSwap = () => {
  if (swap.value === 'fix') {
    swap.value = 'range'
    _value.value = [
      {
        column: 'currentValue',
        value: '',
        termType: undefined,
        type: 'or',
      },
      {
        column: 'currentValue',
        value: '',
        termType: undefined,
        type: 'or',
      },
    ]
  } else {
    swap.value = 'fix'
    _value.value = [
      {
        column: 'currentValue',
        value: undefined,
        termType: undefined,
        type: 'and',
      },
    ]
  }
  handleChange()
}

const handleTag = (e: any) => {
  if (e.target.value === 'currentValue') {
    swap.value = 'fix'
    _value.value = [
      {
        column: 'currentValue',
        value: undefined,
        termType: undefined,
        type: 'and',
      },
    ]
  } else {
    _value.value = [
      {
        column: `this['currentValue'] - this['lastValue']*init/100`,
        value: 0,
        termType: 'lt',
        type: 'or',
      },
      {
        column: `this['currentValue'] - this['lastValue']*0/100`,
        value: 0,
        termType: 'gt',
        type: 'or',
      },
    ]
  }
  handleChange()
}

const handlePercent = (e: any) => {
  if (e) {
    _value.value = [
      {
        column: `this['currentValue'] - this['lastValue'] * ${e}/100`,
        value: 0,
        termType: 'lt',
        type: 'or',
      },
      {
        column: `this['currentValue'] - this['lastValue'] * ${e + 100}/100`,
        value: 0,
        termType: 'gt',
        type: 'or',
      },
    ]
  } else {
    _value.value = [
      {
        column: `this['currentValue'] - this['lastValue'] * 1/100`,
        value: 0,
        termType: 'lt',
        type: 'or',
      },
      {
        column: `this['currentValue'] - this['lastValue'] * 1/100`,
        value: 0,
        termType: 'gt',
        type: 'or',
      },
    ]
  }
  handleChange()
}

const handlePercentProps = (arr: any) => {
  const obj = arr.find((item: any) => item.termType === 'lt')
  const val = obj?.column.split('*')[1].split('/')[0]
  percentValue.value = val !== 'init' ? val : undefined
}

const handleChange = () => {
  emits('update:value', _value.value)
  emits('change', _value.value)
  formItemContext.onFieldChange()
}

watch(
  () => props.value,
  (val: any) => {
    if (val && val.length !== 0) {
      deathArea.value = true
      if (val && val[0]?.column === 'currentValue') {
        tag.value = 'currentValue'
        _value.value = val
        if (val.length === 2) {
          swap.value = 'range'
        }
      } else {
        handlePercentProps(val)
        tag.value = `this['currentValue'] - this['lastValue']`
      }
    }
  },
  { deep: true, immediate: true },
)
</script>

<style scoped lang="less">
.top {
  padding: 12px 0;
}

.fixed {
  padding: 12px 0;
}

.percent {
  display: flex;
  align-items: center;
  padding: 12px;

  .percent-title {
    margin-right: 10px;
  }
}
</style>
