import { request } from '@/utils/axios'

export const queryAccess = (data: object) =>
    request.post(`/logger/access/_query`, data);

export const querySystem = (data: object) =>
    request.post(`/logger/system/_query`, data);
