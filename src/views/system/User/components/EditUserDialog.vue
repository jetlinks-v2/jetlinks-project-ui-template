<template>
  <j-modal
    visible
    :title="dialogTitle"
    :maskClosable="false"
    width="675px"
    @ok="confirm"
    @cancel="emits('update:visible', false)"
    class="edit-dialog-container"
    :confirmLoading="loading"
    cancelText="取消"
    okText="确定"
  >
    <j-form ref="formRef" :model="form.data" layout="vertical">
      <j-row :gutter="24" v-if="IsShow('add', 'edit')">
        <j-col :span="12">
          <j-form-item
            name="name"
            label="姓名"
            :rules="[
              { required: true, message: '请输入姓名' },
              {
                max: 64,
                message: '最多可输入64个字符',
              },
            ]"
          >
            <j-input v-model:value="form.data.name" placeholder="请输入姓名" />
          </j-form-item>
        </j-col>
        <j-col :span="12">
          <j-form-item
            name="username"
            label="用户名"
            :rules="[
              { required: true, message: '' },
              {
                validator: rules.checkUserName,
                trigger: 'blur',
              },
            ]"
          >
            <j-input
              v-model:value="form.data.username"
              placeholder="请输入用户名"
              :disabled="props.type === 'edit'"
            />
          </j-form-item>
        </j-col>
      </j-row>
      <j-row v-if="IsShow('add', 'reset')">
        <j-col :span="24">
          <j-form-item
            name="password"
            label="密码"
            :rules="[
              { required: true, message: '' },
              {
                validator: rules.checkPassword,
                trigger: 'change',
              },
            ]"
          >
            <j-input-password
              v-model:value="form.data.password"
              placeholder="请输入密码"
            />
          </j-form-item>
        </j-col>
      </j-row>
      <j-row v-if="IsShow('add', 'reset')">
        <j-col :span="24">
          <j-form-item
            name="confirmPassword"
            label="确认密码"
            :rules="[
              { required: true, message: '' },
              {
                validator: rules.checkAgainPassword,
                trigger: 'blur',
              },
            ]"
          >
            <j-input-password
              v-model:value="form.data.confirmPassword"
              placeholder="请再次输入密码"
              :maxlength="64"
            />
          </j-form-item>
        </j-col>
      </j-row>
      <j-row :gutter="24" v-if="IsShow('add', 'edit')">
        <j-col :span="12">
          <j-form-item name="roleIdList" label="角色" class="flex">
            <j-select
              v-model:value="form.data.roleIdList"
              mode="multiple"
              style="width: calc(100% - 40px)"
              placeholder="请选择角色"
              :options="form.roleOptions"
            ></j-select>

            <PermissionButton
              :hasPermission="`${rolePermission}:add`"
              @click="clickAddItem('roleIdList', 'Role')"
            >
              <AIcon type="PlusOutlined" />
            </PermissionButton>
          </j-form-item>
        </j-col>
        <j-col :span="12">
          <j-form-item name="orgIdList" label="组织" class="flex">
            <j-tree-select
              v-model:value="form.data.orgIdList"
              show-search
              style="width: calc(100% - 40px)"
              placeholder="请选择组织"
              :tree-data="form.departmentOptions"
              :fieldNames="{ label: 'name', value: 'id' }"
              multiple
            >
              <template #title="{ name }">
                {{ name }}
              </template>
            </j-tree-select>
            <PermissionButton
              :hasPermission="`${deptPermission}:add`"
              @click="clickAddItem('orgIdList', 'Department')"
            >
              <AIcon type="PlusOutlined" />
            </PermissionButton>
          </j-form-item>
        </j-col>
      </j-row>
      <j-row :gutter="24" v-if="IsShow('add', 'edit')">
        <j-col :span="12">
          <j-form-item
            name="telephone"
            label="手机号"
            :rules="[
              {
                pattern: /^1[3456789]\d{9}$/,
                message: '请输入正确的手机号',
              },
            ]"
          >
            <j-input
              v-model:value="form.data.telephone"
              placeholder="请输入手机号"
              :maxlength="64"
            />
          </j-form-item>
        </j-col>
        <j-col :span="12">
          <j-form-item
            name="email"
            label="邮箱"
            :rules="[
              {
                pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                message: '请输入正确的邮箱',
              },
            ]"
          >
            <j-input
              v-model:value="form.data.email"
              placeholder="请输入邮箱"
              :maxlength="64"
            />
          </j-form-item>
        </j-col>
      </j-row>
    </j-form>
  </j-modal>
</template>

<script setup lang="ts">
import { message } from 'jetlinks-ui-components'
import {
  validateField_api,
  getRoleList_api,
  getDepartmentList_api,
  addUser_api,
  updateUser_api,
  updatePassword_api,
  getUser_api,
} from '@/api/user'
import { useRequest } from '@jetlinks/hooks'
import { regular } from '@jetlinks/utils'

const deptPermission = 'system/Department'
const rolePermission = 'system/Role'

type modalType = '' | 'add' | 'edit' | 'reset'
type formType = {
  id?: string
  name: string
  username: string
  password: string
  confirmPassword: string
  roleIdList: string[]
  orgIdList: string[]
  telephone: string
  email: string
}
type dictType = {
  id: string
  name: string
  children?: dictType
}
type optionType = {
  value: string
  label: string
}

const emits = defineEmits(['confirm', 'update:visible'])
const props = defineProps<{
  type: modalType
  data: any
  visible: boolean
}>()
// 弹窗相关
const dialogTitle = computed(() => {
  if (props.type === 'add') return '新增'
  else if (props.type === 'edit') return '编辑'
  else if (props.type === 'reset') return '重置密码'
  else return ''
})

const formRef = ref<any>()
const form = reactive({
  data: {} as formType,

  roleOptions: [] as optionType[],
  departmentOptions: [] as any[],
})

const rules = {
  checkUserName: (_rule: any, value: string): Promise<any> =>
    new Promise((resolve, reject) => {
      if (props.type === 'edit') return resolve('')

      if (!value) return reject('请输入用户名')
      else if (value.length > 64) return reject('最多可输入64个字符')
      validateField_api('username', value).then((resp: any): any => {
        resp.result.passed ? resolve('') : reject(resp.result.reason)
      })
    }),
  checkPassword: (_rule: any, value: string): Promise<any> =>
    new Promise((resolve, reject) => {
      if (!value) return reject('请输入密码')
      else if (value.length > 64) return reject('最多可输入64个字符')
      else if (value.length < 8) return reject('密码不能少于8位')
        else if (!regular.isPassword(value))
          return reject('密码必须包含大小写英文和数字')
      validateField_api('password', value).then((resp: any) => {
        resp.result.passed ? resolve('') : reject(resp.result.reason)
      })
    }),
  checkAgainPassword: (_rule: any, value: string): Promise<any> => {
    if (!value) return Promise.reject('请输入8~64位的密码')
    return value === form.data.password
      ? Promise.resolve()
      : Promise.reject('两次密码输入不一致')
  },
}

const getUserInfo = () => {
  const id = props.data.id || ''

  if (props.type === 'add') form.data = {} as formType
  else if (props.type === 'reset') form.data = { id } as formType
  else if (props.type === 'edit') {
    getUser_api(id).then((resp: any) => {
      form.data = {
        ...(resp.result as formType),
        orgIdList: resp.result.orgList.map((item: dictType) => item.id),
        roleIdList: resp.result.roleList.map((item: dictType) => item.id),
      }
      nextTick(() => {
        formRef.value?.clearValidate()
      })
    })
  }
}

const getRoleList = () => {
  getRoleList_api().then((resp: any) => {
    form.roleOptions = resp.result.map((item: dictType) => ({
      label: item.name,
      value: item.id,
    }))
  })
}
const getDepartmentList = () => {
  getDepartmentList_api().then((resp: any) => {
    form.departmentOptions = resp.result
  })
}
const IsShow = (...typeList: modalType[]) => typeList.includes(props.type)

const clickAddItem = (prop: 'roleIdList' | 'orgIdList', target: string) => {
  const tab: any = window.open(`${origin}/#/system/${target}?save=true`)
  tab.onTabSaveSuccess = (value: string) => {
    form.data[prop] = [...(form.data[prop] || []), value]
    if (prop === 'roleIdList') getRoleList()
    else getDepartmentList()
  }
}

const init = () => {
  getDepartmentList()
  getRoleList()
  getUserInfo()
}

// const getApi = () => {
//   let api: any = undefined
//   if (props.type === 'add') {
//     api = addUser_api
//   } else if (props.type === 'edit') {
//     api = updateUser_api
//   } else if (props.type === 'reset') {
//     api = updatePassword_api
//   }
//   return api
// }

const { loading, run } = useRequest(props.type === 'add' ? addUser_api : (props.type === 'edit' ? updateUser_api : updatePassword_api), {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      message.success('操作成功')
      emits('confirm')
      emits('update:visible', false)
    }
  },
})

const confirm = () => {
  formRef.value?.validate().then(() => {
    let params = {}

    if (props.type === 'add') {
      // api = addUser_api
      params = {
        user: form.data,
        orgIdList: form.data.orgIdList,
        roleIdList: form.data.roleIdList,
      }
    } else if (props.type === 'edit') {
      // api = updateUser_api
      params = {
        id: form.data.id,
        user: form.data,
        orgIdList: form.data.orgIdList,
        roleIdList: form.data.roleIdList,
      }
    } else if (props.type === 'reset') {
      // api = updatePassword_api
      params = {
        id: form.data.id,
        password: form.data.password,
      }
    }
    run(params)
  })
}

watchEffect(() => {
  if (props.visible) {
    init()
  }
})
</script>

<style lang="less" scoped>
.edit-dialog-container {
  .ant-form-item {
    &.flex {
      :deep(.ant-form-item-control-input-content) {
        display: flex;
        .ant-select {
          flex: 1;
        }
        .ant-tooltip-disabled-compatible-wrapper {
          .ant-btn {
            color: rgba(0, 0, 0, 0.25);
            border-color: #d9d9d9;
            background: #f5f5f5;
            text-shadow: none;
            box-shadow: none;
          }
        }
        .ant-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #1d39c4;
          color: #1d39c4;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
