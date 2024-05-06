<template>
  <a-modal width="675px" visible @ok="handleOk" @cancel="handleCancel" :title="title" :confirmLoading="loading">
    <!-- 新增用户表单 -->
    <a-form layout="vertical" :model="form.formData" :rules="formRules" ref="formRef" class="user-dialog-form">
        <a-row v-if="!isReset">
            <!-- 姓名输入框 -->
            <a-col :span="12">
                <a-form-item label="姓名" name="name" class="userDialog-form-item-left">
                    <a-input v-model:value="form.formData.name" placeholder="请输入姓名"></a-input>
                </a-form-item>
            </a-col>
            <!-- 用户名输入框 -->
            <a-col :span="12">
                <a-form-item label="用户名" name="username" class="userDialog-form-item-right">
                    <a-input v-model:value="form.formData.username" placeholder="请输入用户名" :disabled="props.modalType === 'edit'"></a-input>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row v-if="!isEdit">
            <!-- 密码输入框 -->
            <a-col :span="24">
                <a-form-item label="密码" name="password">
                    <a-input-password v-model:value="form.formData.password" placeholder="请输入密码"></a-input-password>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row v-if="!isEdit">
            <!-- 确认密码输入框 -->
            <a-col :span="24">
                <a-form-item label="确认密码" name="confirmPassword">
                    <a-input-password v-model:value="form.formData.confirmPassword" placeholder="请再次输入密码"></a-input-password>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row v-if="!isReset">
            <!-- 角色选择框 -->
            <a-col :span="12">
                <a-form-item name="roleIdList" label="角色" class="userDialog-form-item-left flex" >
                    <a-select v-model:value="form.formData.roleIdList" :options="form.roleOptions" mode="multiple" placeholder="请选择角色"></a-select>
                    <!-- 新增角色按钮 -->
                    <j-permission-button :hasPermission="`${rolePermission}:add`" @click="clickAddItem('roleIdList', 'Role')" class="bt">
                        <AIcon type="PlusOutlined" />
                    </j-permission-button>
                </a-form-item>
            </a-col>
            <!-- 组织选择框 -->
            <a-col :span="12">
                <a-form-item name="orgIdList" label="组织" class="userDialog-form-item-right flex">
                    <a-select v-model:value="form.formData.orgIdList" :options="form.departmentOptions" mode="multiple" placeholder="请选择组织"></a-select>
                    <!-- 新增组织按钮 -->
                    <j-permission-button :hasPermission="`${deptPermission}:add`" @click="clickAddItem('orgIdList', 'Department')" class="bt">
                        <AIcon type="PlusOutlined" />
                    </j-permission-button>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row v-if="!isReset">
            <a-col :span="12">
                <a-form-item label="手机号" name="telephone" class="userDialog-form-item-left">
                    <a-input v-model:value="form.formData.telephone" placeholder="请输入邮箱"></a-input>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="邮箱" name="email" class="userDialog-form-item-right">
                    <a-input v-model:value="form.formData.email" placeholder="请输入邮箱"></a-input>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts" name="UserDialog">
import { ref, reactive } from 'vue';
import { onlyMessage } from '@jetlinks-web/utils';
import { FormDataType } from '@/views/system/User/components/UserDialog/typing'
import { OptionType, DictType, ModalType } from '@/views/system/User/typing'
import {
  getUser_api,
  validateField_api,
  getRoleList_api,
  getDepartmentList_api,
  addUser_api,
  updateUser_api,
  updatePassword_api,
} from '@/api/system/user'
import { useRequest } from '@jetlinks-web/hooks';

// 传入参数
const props = defineProps({
  // 对话框类型
  modalType: {
    type: String as PropType<ModalType>,
    default: 'add'
  },
  // 传入数据
  data: {
    type: Object as PropType<FormDataType>,
    default: { }
  },
})

// 表单相关数据
const form = reactive({
  // 表单数据
  formData: {} as FormDataType,
  // 角色下拉框内容
  roleOptions: [] as OptionType[],
  // 组织下拉框内容
  departmentOptions: [] as OptionType[]
})

// 是否是编辑模式
const isEdit = computed(() => {
  return props.modalType === 'edit'
})

// 是否是修改密码模式
const isReset = computed(() => {
  return props.modalType === 'reset'
})

// 对话框标题
const title = computed(() => {
    switch (props.modalType) {
      case 'add':
        return '新增';
      case 'edit':
        return '编辑'
      case 'reset':
        return '重置密码';
    }
})


// 角色相关权限
const rolePermission = 'system/Role'
// 组织相关权限
const deptPermission = 'system/Department'

const formRef = ref<any>()

// 表单验证规则
const formRules = {
  // 姓名验证规则
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    },
    {
      max: 64,
      message: '最多可输入64位'
    }
  ],
  // 用户名验证规则
  username: [
    {
        required: true,
        message: ""
    },
    {
        validator: (_rule: any, value: string): Promise<any> =>
            new Promise((resolve, reject) => {
                if (props.modalType === 'edit') return resolve('')
                if(!value) {
                  return reject('请输入用户名')
                } else if (value.length > 64) {
                  return reject('最多可输入64个字符')
                }
                validateField_api('username', value).then((resp: any): any => {
                    resp.result.passed ? resolve('') : reject(resp.result.reason)
                })
            }),
    }
  ],
  // 密码验证规则
  password: [
    {
        required: true,
        message: "",
    },
    {
        validator: (_rulw: any, value: string): Promise<any> =>
            new Promise((resolve, reject) => {
                if(!value) {
                  return reject('请输入密码')
                } else if(value.length < 8) {
                  return reject('密码不能少于8位')
                } else if (value.length > 64) {
                  return reject('最多可输入64个字符')
                }
                validateField_api('password', value).then((resp: any) => {
                    resp.result.passed ? resolve('') : reject(resp.result.reason)
                })
            })
    }
  ],
  // 确认密码验证规则
  confirmPassword: [
    {
        required: true,
        message: ""
    },
    {
        validator: (_rulw: any, value: string): Promise<any> =>
            new Promise((resolve, reject) => {
                if(!value) {
                  return reject('请输入确认密码')
                } else if(value.length < 8) {
                  return reject('密码不能少于8位')
                } else if (value.length > 64) {
                  return reject('最多可输入64个字符')
                } else {
                  return value === form.formData.password ? resolve('') : reject('两次密码不一致')
                }
            })
    }
  ],
  // 手机验证规则
  telephone: [
    {
        pattern: /^1[3456789]\d{9}$/,
        message: '请输入正确的手机号'
    }
  ],
  // 邮箱验证规则
  email: [
    {
        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        message: '请输入正确的邮箱'
    }
  ]
}

const emit = defineEmits(['save', 'cancel'])

// 获取角色列表
const { run: runGetRoleList} = useRequest(getRoleList_api, {
  immediate: false,
  onSuccess(res) {
    if(res.success) {
      form.roleOptions = res.result.map((item: DictType) => ({
        label: item.name,
        value: item.id
      }))
    }
  }
})


// 获取组织列表
const { run: runGetDepartmentList} = useRequest(getDepartmentList_api, {
  immediate: false,
  onSuccess(res) {
    if(res.success) {
      form.departmentOptions = res.result.map((item: DictType) => ({
        label: item.name,
        value: item.id
      }))
    }
  }
})

const { run: runGetUser} = useRequest(getUser_api, {
  immediate: false,
  onSuccess(res) {
    if(res.success) {
      form.formData = {
        ...(res.result as FormDataType),
        orgIdList: res.result.orgList.map((item: DictType) => item.id),
        roleIdList: res.result.roleList.map((item: DictType) => item.id)
      }
      nextTick(() => {
        formRef.value?.clearValidate()
      })
    }
  }
})

 /**
 * 获取当前用户信息
 */
const getUserInfo = () => {
  const id = props.data.id || ''

  if (props.modalType === 'add') {
    form.formData = {} as FormDataType
  } else if (props.modalType === 'reset') {
    form.formData = { id } as FormDataType
  } else if (props.modalType === 'edit') {
    runGetUser(id);
  }
}

 /**
 * 点击新增按钮操作 （角色或组织）
 * @param prop 类型 'roleIdList' 或 'orgIdList'
 * @param target 跳转目标
 */
const clickAddItem = (prop: 'roleIdList' | 'orgIdList', target: string) => {
  const tab: any = window.open(`${origin}/#/system/${target}?save=true`)
  tab.onTabSaveSuccess = (value: string) => {
    form.formData[prop] = [...(form.formData[prop] || []), value]
    if (prop === 'roleIdList') {
      runGetRoleList()
    } else {
      runGetDepartmentList()
    }
  }
}

// 添加用户
const {loading: addLoading, run: runAdd} = useRequest(addUser_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      onlyMessage('添加用户成功', 'success')
      emit('save')
    }
  }
})

// 修改用户信息
const {loading: editLoading, run: runEdit} = useRequest(updateUser_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      onlyMessage('修改用户信息成功', 'success')
      emit('save')
    }
  }
})

// 修改密码
const {loading: resetLoading, run: runReset} = useRequest(updatePassword_api, {
  immediate: false,
  onSuccess(res) {
    if (res.success) {
      onlyMessage('修改密码成功', 'success')
      emit('save')
    }
  }
})

const loading = computed(() => {
  return addLoading.value || editLoading.value || resetLoading.value
})

 /**
 * 获取提交接口参数
 */
const getParams = () => {
  switch (props.modalType) {
    case 'add':
      return {
        user: form.formData,
        orgIdList: form.formData.orgIdList,
        roleIdList: form.formData.roleIdList
      }
    case 'edit':
      return {
        id: form.formData.id,
        user: form.formData,
        orgIdList: form.formData.orgIdList,
        roleIdList: form.formData.roleIdList
      }
    case 'reset':
      return {
        id: form.formData.id,
        password: form.formData.password
      }
  }
}

 /**
 * 点击确认按钮事件
 */
const handleOk = () => {
  formRef.value?.validate().then(() => {
    const params = getParams()
    // 新增用户
    if (props.modalType === 'add') {
      runAdd(params);
      // 修改用户信息
    } else if (props.modalType === 'edit') {
      runEdit(params);
      // 修改密码
    } else if (props.modalType === 'reset') {
      runReset(params);
    }
  })
}

 /**
 * 点击取消按钮事件
 */
const handleCancel = () => {
    emit('cancel')
}

 /**
 * 对话框初始化
 */
const init = () => {
    runGetRoleList()
    runGetDepartmentList()
    getUserInfo()
}

 /**
 * 如果对话框显示，执行初始化函数
 */
// watchEffect(() => {
//   if (props.visible) {
//     init()
//   }
// })
onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.userDialog-form-item-left {
  margin-right: 12px;
}
.userDialog-form-item-right {
  margin-left: 12px;
}
.flex {
  :deep(.ant-form-item-control-input-content) {
    display: flex;
    .bt {
      width: 32px;
      height: 32px;
      border: 1px solid @primary-color;
      color: @primary-color;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      cursor: pointer;
    }
  }
}
</style>
