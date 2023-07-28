import { request } from '@jetlinks/core'

/**
 * 获取用户基本信息
 * @returns
 */
export const detail = () => request.get('/user/detail')

// 获取用户类型
export const getUserType_api = () => request.get(`/user/detail/types`);

// 获取用户列表
export const getUserList_api = (data: any) => request.post(`/user/detail/_query`, data);

// 校验字段合法性
export const validateField_api = (type: 'username' | 'password', name: string) => request.post(`/user/${type}/_validate`, name, {
    headers: {
        'Content-Type': 'text/plain'
    }
})

// 获取角色列表
export const getRoleList_api = () => request.get(`/role/_query/no-paging?paging=false`);
// 获取组织列表
export const getDepartmentList_api = () => request.get(`/organization/_all/tree?paging=false`);

// 获取用户信息
export const getUser_api = (id: string) => request.get(`/user/detail/${id}`);
// 添加用户
export const addUser_api = (data: any) => request.post(`/user/detail/_create`, data);
// 更新用户
export const updateUser_api = (data: any) => request.put(`/user/detail/${data.id}/_update`, data);
// 更新密码
export const updatePassword_api = (data: { id: string, password: string }) => request.post(`/user/${data.id}/password/_reset`, data.password, {
    headers: {
        'Content-Type': 'text/plain'
    }
});
// 修改用户状态
export const changeUserStatus_api = (data: object) => request.patch(`/user`,data);
// 删除用户
export const deleteUser_api = (id: string) => request.remove(`/user/${id}`);

