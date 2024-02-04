import { request } from '@/utils/axios'

export const query = (data: any) =>
    request.post(`/data-collect/channel/_query`, data);

export const remove = (id: string) =>
    request.remove(`/data-collect/channel/${id}`);

export const save = (data: any) => request.post(`/data-collect/channel`, data);

export const update = (id: string, data: any) =>
    request.put(`/data-collect/channel/${id}`, data);

export const getProviders = () => request.get(`/data-collect/channel/providers`);

export const queryOptionsList = (type: string) =>
    request.get(`/data-collect/opc/${type}`);

export const validateField = (data: any) =>
    request.post(`/data-collect/opc/endpoint/_validate`, data, {
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
        },
    });

export const queryCertificateList = () =>
    request.get(`/network/certificate/_query/no-paging?paging=false`, {});
