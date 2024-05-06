import dayjs from "dayjs";
import { downloadFileByUrl, getImage, LocalStore } from '@jetlinks-web/utils'
import {getFileUrlById} from "@/api/comm";

export const downloadJson = (record: Record<string, any>, fileName: string, format?: string) => {
    const _time = dayjs(new Date()).format(format || 'YYYY_MM_DD')
    const _download = `${fileName || record?.name}-${_time}`
    //字符串内容转成Blob地址
    const blob = new Blob([JSON.stringify(record)]);
    const _url = URL.createObjectURL(blob);
    downloadFileByUrl(_url, _download, 'json')
}

/**
 * 修改Select参数column的值
 * @param e // 查询参数 e
 * @param column {Object} {需要修改的值: 修改后的值}
 * {
        username: 'context.username',
    }
 */
    export const modifySearchColumnValue = (e: any, column: object) => {
        e.terms.forEach((item: any) => {
            item.terms.forEach((t: any) => {
                if (column[t.column]) {
                    t.column = column[t.column];
                }
            });
        });
        return e;
      };

/**
 * 为了区分是本地的图片还是线上的图片
 * @param id
 */
export const getImageUrl = (id: string) => {
    if(id.includes('localhost')){
        return getImage(id.replace('localhost', ''))
    }
    return getFileUrlById(id)
}

export const getAppId = () => {
    return LocalStore.get('app_id')
}

export const setAppId = (id: string) => {
    LocalStore.set('app_id', id)
}
