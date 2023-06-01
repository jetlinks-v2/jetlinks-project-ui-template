import { request } from '@jetlinks/core'

/**
 * 登录
 * @param data 
 * @returns 
 */
export const login = (data: any) => request.post('/authorize/login', data)

/**
 * 获取配置信息
 * @returns 
 */
export const detail = () => request.get('/user/detail')

/**
 * 退出登录
 */
export const logout = () => request.get('/user-token/reset')
