// 仪表盘数据
import { request } from '@jetlinks-web/core';
/**
 * 项目数量
 */
export const productCount = (data?: any) => request.post(`/device-product/_count`, data);
/**
 * 设备数量
 */
export const deviceCount = (data?: any) => request.post('/device/instance/_count', data);
/**
 * 当前在线
 */
export const dashboard = (data?: any) => request.post('/dashboard/_multi', data);
/**
 * 地图数据
 */
export const getGo = (data?: any) => request.post('/geo/object/device/_search/geo.json', data);
// 通道数量
export const channelCount = (data: any) =>
  request.post<number>(`/data-collect/channel/_count`, data);
// 采集器数量
export const collectorCount = (data: any) =>
  request.post<number>(`/data-collect/collector/_count`, data);
// 采集点位
export const collectorPoints = (data: any) =>
  request.post<number>(`/data-collect/point/_count`, data);
// 视频设备数量
export const videoDevicesNum = (params: any) => request.get<number>(`/media/device/_count`, params);
// 告警数量
export const alarmNum = (data: any) => request.post<number>(`/alarm/config/_count`, data);

// 告警趋势数据
export const trendData_api = (data: any) => request.post<number>(`/dashboard/_multi`, data);
// 查询特定天数流量数据
export const queryFlow = (beginTime: any, endTime: any, data: any) =>
  request.post(`/network/flow/_query/${beginTime}/${endTime}`, data);
