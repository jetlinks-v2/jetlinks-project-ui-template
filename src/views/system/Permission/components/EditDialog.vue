<template>
  <j-modal
    visible
    :title="dialogTitle"
    width="1000px"
    @ok="confirm"
    @cancel="emits('update:visible', false)"
    :confirmLoading="loading"
    class="edit-dialog-container"
  >
    <j-form ref="formRef" :model="modelRef" layout="vertical">
      <j-form-item
        name="id"
        :rules="[
          { required: true, message: '' },
          { validator: idCheck, trigger: 'blur' },
        ]"
        class="question-item"
      >
        <template #label>
          <span>标识</span>
          <span class="required-icon">*</span>
          <j-tooltip placement="top">
            <template #title>
              <span>标识ID需与代码中的标识ID一致</span>
            </template>
            <AIcon type="QuestionCircleOutlined" style="color: #00000073" />
          </j-tooltip>
        </template>
        <j-input
          v-model:value="modelRef.id"
          placeholder="请输入标识(ID)"
          :disabled="dialogTitle === '编辑'"
        />
      </j-form-item>
      <j-form-item
        name="name"
        label="名称"
        :rules="[
          { required: true, message: '请输入名称' },
          {
            max: 64,
            message: '最多可输入64个字符',
          },
        ]"
      >
        <j-input v-model:value="modelRef.name" placeholder="请输入名称" />
      </j-form-item>

      <!-- 操作权限列表 -->
      <j-table
        :columns="columns"
        :data-source="modelRef.actions"
        :pagination="false"
        class="m-table"
        :scroll="{ y: 300 }"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            {{ `#${index + 1}.` }}
          </template>
          <template v-else-if="column.key !== 'index' && column.key !== 'actions'">
            <j-form-item
              :name="['actions', index, column.key]"
              :rules="[
                {
                  required: column.key !== 'describe',
                  message: `请输入${column.title}`,
                },
                {
                  max: 64,
                  message: '最多可输入64个字符',
                },
              ]"
            >
              <j-input v-model:value="record[column.key]" />
            </j-form-item>
          </template>
          <template v-else-if="column.key === 'actions'">
            <j-button
              style="padding: 0"
              type="link"
              danger
              @click="clickRemove(index)"
            >
              <AIcon type="DeleteOutlined" />
            </j-button>
          </template>
        </template>
      </j-table>
    </j-form>
    <j-button type="dashed" style="width: 100%" @click="clickAdd">
      <AIcon type="PlusOutlined" /> 添加
    </j-button>
  </j-modal>
</template>

<script setup lang="ts">
import { message } from 'jetlinks-ui-components'

import {
  checkId_api,
  editPermission_api,
  addPermission_api,
} from '@/api/permission'
import { useRequest } from '@jetlinks/hooks'

const defaultAction = [
  { action: 'query', name: '查询', describe: '查询' },
  { action: 'save', name: '保存', describe: '保存' },
  { action: 'delete', name: '删除', describe: '删除' },
]
const emits = defineEmits(['refresh', 'update:visible'])

const props = defineProps<{
  data: any
  visible: boolean
}>()

const dialogTitle = computed(() => (props.data.id ? '编辑' : '新增'))
// 表单相关
const formRef = ref<any>()

const modelRef = reactive({
  name: '',
  id: '',
  actions: [...defaultAction],
})

// 校验标识是否可用
const idCheck = async (_rule: any, id: string): Promise<any> => {
  if (!id) return Promise.reject('请输入标识(ID)')
  else if (id.length > 64) return Promise.reject('最多可输入64个字符')
  else if (props.data.id && props.data.id === modelRef.id)
    return Promise.resolve()
  else {
    const resp: any = await checkId_api({ id })
    if (resp.result.passed) return Promise.resolve()
    else return Promise.reject(resp.result.reason)
  }
}

const columns = [
  {
    title: '-',
    dataIndex: 'index',
    key: 'index',
    width: 80,
    align: 'center',
  },
  {
    title: '操作类型',
    dataIndex: 'action',
    key: 'action',
    width: 220,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 220,
  },
  {
    title: '说明',
    dataIndex: 'describe',
    key: 'describe',
    width: 220,
  },
  {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
  },
]

watchEffect(() => {
  Object.assign(modelRef, props.data)
  modelRef.actions = props.data.id
    ? [...props.data.actions]
    : [...defaultAction]
})

const clickRemove = (index: number) => {
  modelRef.actions.splice(index, 1)
}
const clickAdd = () => {
  modelRef.actions.push({
    action: '',
    name: '',
    describe: '',
  })
}

const { loading, run } = useRequest(
  props.data.id ? editPermission_api : addPermission_api,
  {
    immediate: false,
    onSuccess(res) {
      if (res.success) {
        message.success('操作成功')
        emits('refresh')
        emits('update:visible', false)
      }
    },
  },
)

const confirm = () => {
  formRef.value?.validate().then(() => {
    const params = {
      ...props.data,
      ...modelRef,
      actions: modelRef.actions.filter((item: any) => item.action && item.name),
    }
    run(params)
  })
}
</script>

<style lang="less" scoped>
.edit-dialog-container {
  .question-item {
    :deep(.ant-form-item-required) {
      &::before {
        display: none;
      }
      .required-icon {
        display: inline-block;
        margin-right: 4px;
        margin-left: 2px;
        color: #ff4d4f;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
      }
    }
  }

  .ant-table {
    color: #ff4d4f;

    .ant-table-tbody {
      color: #ff4d4f;
    }
  }
//   .delete-btn {
//     color: #000000d9;
//     &:hover {
//       color: #415ed1;
//     }
//   }
//   .pager {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 12px;
//     .ant-pagination {
//       margin-left: 8px;
//       :deep(.ant-pagination-item) {
//         display: none;
//       }
//     }
//   }
}

.m-table {
    :deep(.ant-form-item){
        margin-bottom: 0px;
    }
}
</style>
