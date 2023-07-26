// 用户表单格式
export interface FormDataType {
    // 用户id
    id?: string
    // 姓名
    name: string
    // 用户名
    username: string
    // 密码
    password: string
    // 确认密码
    confirmPassword: string
    // 角色列表
    roleIdList: string[]
    // 组织列表
    orgIdList: string[]
    // 手机号
    telephone: string
    // 邮箱
    email: string
}

// 对话框类型
export type ModalType = '' | 'add' | 'edit' | 'reset'