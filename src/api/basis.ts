import { request } from '@jetlinks/core'

// 保存
export const save_api = (data: any) => request.post(`/system/config/scope/_save`, data)
// 获取详情
export const getDetails_api = (data: any) => request.post<any>(`/system/config/scopes`, data)
