import { request } from '@jetlinks-web/core'

export const queryCollectorTree = (data: any) =>
  request.post(`/data-collect/collector/_detail/no-paging?paging=false`, data);

export const queryChannelNoPaging = () =>
  request.post(`/data-collect/channel/_query/no-paging`, {
        paging: false,
        sorts: [{ name: 'createTime', order: 'desc' }],
    });

export const save = (data: any) => request.post(`/data-collect/collector`, data);

export const update = (id: string, data: any) =>
    request.put(`/data-collect/collector/${id}`, data);

export const remove = (id: string) =>
    request.remove(`/data-collect/collector/${id}`);

export const queryPoint = (data: any) =>
    request.post(`/data-collect/point/_query`, data);

export const _validateField = (id: string, data?: any) =>
    request.get(`/data-collect/point/${id}/_validate`, data);

export const queryCodecProvider = () => request.get(`/things/collector/codecs`);

export const updatePoint = (id: string, data: any) =>
    request.put(`/data-collect/point/${id}`, data);

export const savePointBatch = (data: any) =>
    request.patch(`/data-collect/point`, data);

export const savePoint = (data: any) =>
    request.post(`/data-collect/point`, data);

export const batchDeletePoint = (data: any) =>
    request.post(`/data-collect/point/batch/_delete`, data);

export const removePoint = (id: string) =>
    request.remove(`/data-collect/point/${id}`);

export const readPoint = (collectorId: string, data: string[]) =>
    request.post(`/data-collect/collector/${collectorId}/points/_read`, data);

export const writePoint = (collectorId: string, data: string[]) =>
    request.post(`/data-collect/collector/${collectorId}/points/_write`, data);

export const queryPointNoPaging = (data: any) =>
    request.post(`/data-collect/point/_query/no-paging`, data);

export const scanOpcUAList = (data: any) =>
    request.get(
        `/data-collect/opc/channel/${data.id}/nodes?nodeId=${data?.nodeId || ''
        }`,
    );

export const queryTypeList = () => request.get(`/data-collect/opc/data-types`);

export const getProviders = () => request.get('/data-collect/channel/gateway/codec/providers')

export const getStates = () => request.get('/dictionary/running-state/items')

export const getSnapTypes = () => request.get('/s7/client/s7codecs/list')

export const getArea = () => request.get('/s7/client/s7area/list')

export const exportTemplate = (provider: string, format: string) =>request.get(`/data-collect/point/${provider}/template.${format}`, {}, {responseType: 'blob'})
