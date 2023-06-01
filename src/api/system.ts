import { request } from '@jetlinks/core'

/**
 * 系统版本
 */
export const systemVersion = () => request.get('/system/version')

/**
 * 系统配置信息
 * @param scopes
 */
export const settingDetail = (scopes: string) => request.get(`/system/config/${scopes}`)
