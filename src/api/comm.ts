import { request } from '@jetlinks/core'

export const FileStatic = '/file/static'
export const fileUpload = (data: any) => request.post(FileStatic, data)
