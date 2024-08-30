import { request } from '@jetlinks-web/core'

export default {
    // 列表
    list: (data: any) => request.post(`/notifier/template/_query`, data),
    // 详情
    detail: (id: string): any => request.get(`/notifier/template/${id}`),
    // 新增
    save: (data: any) => request.post(`/notifier/template`, data),
    // 修改
    update: (data: any) => request.patch(`/notifier/template`, data),
    del: (id: any) => request.remove(`/notifier/template/${id}`),
    getConfig: (data: any) => request.post(`/notifier/config/_query/no-paging?paging=false`, data),
    getTemplateDetail: (id: string) => request.get<any>(`/notifier/template/${id}/detail`),
    debug: (data: any, configId: string, templateId: string) => request.post(`/notifier/${configId}/${templateId}/_send`, data),
    getHistory: (data: any, id: string) => request.post(`/notify/history/template/${id}/_query`, data),
    // 钉钉/微信, 根据配置获取部门和用户
    getDept: (type: string, id: string) => request.get<any>(`/notifier/${type}/corp/${id}/departments`),
    getUser: (type: string, id: string) => request.get<any>(`/notifier/${type}/corp/${id}/users`),
    // 微信获取标签推送
    getTags: (id: string) => request.get<any>(`/notifier/wechat/corp/${id}/tags`),
    // 语音/短信获取阿里云模板
    getAliTemplate: (id: any) => request.get(`/notifier/sms/aliyun/${id}/templates`),
    // 短信获取签名
    getSigns: (id: any) => request.get(`/notifier/sms/aliyun/${id}/signs`),
    getListByConfigId: (id: string, data: any): any => request.post(`/notifier/template/${id}/_query`, data),
    getListVariableByConfigId: (id: string, data?: any): any => request.post(`/notifier/template/${id}/detail/_query`, data),
}
