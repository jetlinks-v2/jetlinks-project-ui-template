import { request } from '@/utils/axios'

// 获取记录列表
export const getList_api = (data: any): any => request.post(`/notifications/_query`, data)
// 获取未读记录列表
// export const getListByUnRead_api = (data: any): any => request.post(`/notifications/_query`, data)
// 修改记录状态
export const changeStatus_api = (type: '_read' | '_unread', data: string[]): any => request.post(`/notifications/${type}`, data)

export const changeAllStatus = (type: '_read' | '_unread', data: string[]): any => request.post(`/notifications/${type}/provider`, data)
//查看工作流通知详情
export const getWorkflowNotice = (data:any) => request.post('/process/runtime/processes/_query/no-paging',data)

// 查询告警记录详情
export const getDetail = (id: string): any => request.get(`/alarm/record/${id}`)

/**
 * 查询等级
 */
export const queryLevel = () => request.get('/alarm/config/default/level');

// const encodeParams = (params: Record<string, any>) => {
//     let result = {}
//     for (const key in params) {
//         if (Object.prototype.hasOwnProperty.call(params, key)) {
//             const value = params[key];
//             if (key === 'terms') {
//                 result['terms[0].column:'] = 0
//                 result['terms[0].value'] = JSON.stringify(value[0])
//             } else result[key] = value
//         }
//     }

//     return result
// };