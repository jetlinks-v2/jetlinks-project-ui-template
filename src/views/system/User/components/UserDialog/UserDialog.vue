<template>
  <j-modal width="675px" :visible="visible" @ok="handleOk" @cancel="handleCancel" :title="title">
    <!-- 新增用户表单 -->
    <j-form layout="vertical" :model="form.formData" :rules="formRules" ref="formRef" class="user-dialog-form">
        <j-row v-if="modalType !== 'reset'">
            <!-- 姓名输入框 -->
            <j-col :span="12">
                <j-form-item label="姓名" name="name" class="userDialog-form-item-left">
                    <j-input v-model:value="form.formData.name" placeholder="请输入姓名"></j-input>
                </j-form-item>
            </j-col>
            <!-- 用户名输入框 -->
            <j-col :span="12">
                <j-form-item label="用户名" name="username" class="userDialog-form-item-right">
                    <j-input v-model:value="form.formData.username" placeholder="请输入用户名" :disabled="props.modalType === 'edit'"></j-input>
                </j-form-item>
            </j-col>
        </j-row>
        <j-row v-if="modalType !== 'edit'">
            <!-- 密码输入框 -->
            <j-col :span="24">
                <j-form-item label="密码" name="password">
                    <j-input-password v-model:value="form.formData.password" placeholder="请输入密码"></j-input-password>
                </j-form-item>
            </j-col>
        </j-row>
        <j-row v-if="modalType !== 'edit'">
            <!-- 确认密码输入框 -->
            <j-col :span="24">
                <j-form-item label="确认密码" name="confirmPassword">
                    <j-input-password v-model:value="form.formData.confirmPassword" placeholder="请再次输入密码"></j-input-password>
                </j-form-item>
            </j-col>
        </j-row>
        <j-row v-if="modalType !== 'reset'">
            <!-- 角色选择框 -->
            <j-col :span="12">
                <j-form-item name="roleIdList" label="角色" class="userDialog-form-item-left flex" >
                    <j-select v-model:value="form.formData.roleIdList" :options="form.roleOptions" mode="multiple" placeholder="请选择角色"></j-select>
                    <!-- 新增角色按钮 -->
                    <PermissionButton :hasPermission="`${rolePermission}:add`" @click="clickAddItem('roleIdList', 'Role')" class="bt">
                        <AIcon type="PlusOutlined" />
                    </PermissionButton>
                </j-form-item>
            </j-col>
            <!-- 组织选择框 -->
            <j-col :span="12">
                <j-form-item name="orgIdList" label="组织" class="userDialog-form-item-right flex">
                    <j-select v-model:value="form.formData.orgIdList" :options="form.departmentOptions" mode="multiple" placeholder="请选择组织"></j-select>
                    <!-- 新增组织按钮 -->
                    <PermissionButton :hasPermission="`${deptPermission}:add`" @click="clickAddItem('orgIdList', 'Department')" class="bt">
                        <AIcon type="PlusOutlined" />
                    </PermissionButton>
                </j-form-item>
            </j-col>
        </j-row>
        <j-row v-if="modalType !== 'reset'">
            <j-col :span="12">
                <j-form-item label="手机号" name="telephone" class="userDialog-form-item-left">
                    <j-input v-model:value="form.formData.telephone" placeholder="请输入邮箱"></j-input>
                </j-form-item>
            </j-col>
            <j-col :span="12">
                <j-form-item label="邮箱" name="email" class="userDialog-form-item-right">
                    <j-input v-model:value="form.formData.email" placeholder="请输入邮箱"></j-input>
                </j-form-item>
            </j-col>
        </j-row>
    </j-form>
  </j-modal>
</template>

<script setup lang="ts" name="UserDialog">
import { ref, reactive } from 'vue';
import { message } from 'jetlinks-ui-components'
import { FormDataType } from '@/views/system/User/components/UserDialog/typing'
import { OptionType, DictType, ModalType } from '@/views/system/User/typing'
import { passwordRegEx } from '@/utils/validate'
import {
  getUser_api,
  validateField_api,
  getRoleList_api,
  getDepartmentList_api,
  addUser_api,
  updateUser_api,
  updatePassword_api,
} from '@/api/user'
import { useRequest } from '@jetlinks/hooks';

// 表单实例
const fromRef = ref<any>()

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
  // 是否显示对话框
  visible: {
    type: Boolean,
    default: false
  }
})

// 表单相关数据
// let form.formData = reactive<FormDataType>({
      // 用户id
      //id: "",
    // 姓名
    // name: "",
    // 用户名
    //username: "",
    // 密码
    //password: "",
    // 确认密码
    //confirmPassword: "",
    // 角色列表
    //roleIdList: [],
    // 组织列表
    //orgIdList: [],
    // 手机号
    //telephone: "",
    // 邮箱
    //email: ""
//})
const form = reactive({
  // 表单数据
  formData: {} as FormDataType,
  // 角色下拉框内容
  roleOptions: [] as OptionType[],
  // 组织下拉框内容
  departmentOptions: [] as OptionType[]
})

// 对话框标题
const title = computed(() => {
    if (props.modalType === 'add') return '新增';
    else if (props.modalType === 'edit') return '编辑';
    else if (props.modalType === 'reset') return '重置密码';
    else return '';
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
                if(!value) reject('请输入用户名')
                else if (value.length > 64) return reject('最多可输入64个字符')
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
                if(!value) return reject('请输入密码')
                else if(value.length < 8) return reject('密码不能少于8位')
                else if (value.length > 64) return reject('最多可输入64个字符')
                else if (!passwordRegEx(value)) return reject('密码必须包含大小写英文和数字')
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
                if(!value) return reject('请输入确认密码')
                else if(value.length < 8) return reject('密码不能少于8位')
                else if (value.length > 64) return reject('最多可输入64个字符')
                else return value === form.formData.password ? resolve('') : reject('两次密码不一致')
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

const emit = defineEmits(['handleOk', 'update:visible'])

// 获取角色列表
const getRoleList = () => {
    getRoleList_api().then((resp: any) => {
        form.roleOptions = resp.result.map((item: DictType) => ({
            label: item.name,
            value: item.id
        }))
    })
}

// 获取组织列表
const getDepartmentList = () => {
  getDepartmentList_api().then((resp: any) => {
    form.departmentOptions= resp.result
  })
}

// 获取当前用户信息
const getUserInfo = () => {
  const id = props.data.id || ''

  if (props.modalType === 'add') form.formData = {} as FormDataType
  else if (props.modalType === 'reset') form.formData = { id } as FormDataType
  else if (props.modalType === 'edit') {
    getUser_api(id).then((resp: any) => {
      form.formData = {
        ...(resp.result as FormDataType),
        orgIdList: resp.result.orgList.map((item: DictType) => item.id),
        roleIdList: resp.result.roleList.map((item: DictType) => item.id),
      }
      nextTick(() => {
        formRef.value?.clearValidate()
      })
    })
  }
}

// 点击新增按钮操作 （角色或组织）
const clickAddItem = (prop: 'roleIdList' | 'orgIdList', target: string) => {
  const tab: any = window.open(`${origin}/#/system/${target}?save=true`)
  tab.onTabSaveSuccess = (value: string) => {
    form.formData[prop] = [...(form.formData[prop] || []), value]
    if (prop === 'roleIdList') getRoleList()
    else getDepartmentList()
  }
}

// 点击确认按钮事件
const handleOk = () => {
  formRef.value?.validate().then(() => {
    let params = {}
    const { loading, run } = useRequest(props.modalType === 'add' ? addUser_api : (props.modalType === 'edit' ? updateUser_api : updatePassword_api), {
      immediate: false,
      onSuccess(res) {
        if (res.success) {
          message.success('操作成功')
          emit('handleOk')
          emit('update:visible', false)
        }
      },
    })

    // 新增用户
    if (props.modalType === 'add') {
      params = {
        user: form.formData,
        orgIdList: form.formData.orgIdList,
        roleIdList: form.formData.roleIdList,
      }
      // 修改用户信息
    } else if (props.modalType === 'edit') {
      params = {
        id: form.formData.id,
        user: form.formData,
        orgIdList: form.formData.orgIdList,
        roleIdList: form.formData.roleIdList,
      }
      // 修改密码
    } else if (props.modalType === 'reset') {
      params = {
        id: form.formData.id,
        password: form.formData.password,
      }
    }
    console.log("params", params)
    console.log('run', run)
    run(params)
  })
}

// 点击取消按钮事件
const handleCancel = (e: any) => {
    emit('update:visible', false)
}

// 对话框初始化
const init = () => {
    getRoleList()
    getDepartmentList()
    getUserInfo()
}

watchEffect(() => {
  if (props.visible) {
    init()
  }
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
</style>