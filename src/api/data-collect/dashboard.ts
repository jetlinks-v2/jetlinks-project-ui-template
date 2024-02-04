import { request } from '@/utils/axios'

export const queryCount = (type: string, data: any) =>
  request.post(`/data-collect/${type}/_count`, data);

export const dashboard = (data: any) => request.post(`/dashboard/_multi`, data);
