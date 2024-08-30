import { request } from '@jetlinks-web/core'

export const queryCount = (type: string, data: any) =>
  request.post(`/data-collect/${type}/_count`, data);

export const dashboard = (data: any) => request.post(`/dashboard/_multi`, data);
