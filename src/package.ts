import {initWebSocket} from "@/utils/websocket";
import {LocalStore, setToken} from "@jetlinks-web/utils";
import {crateAxios} from '@jetlinks-web/core'
import {jumpLogin} from '@/router'
import { notification } from 'ant-design-vue'

/**
 * 初始化package
 */
export const initPackages = () => {

    /**
     * 初始化websocket
     */
    initWebSocket();
};

export const initAxios = () => {
    crateAxios(
        {
            tokenExpiration: () => {
                jumpLogin()
            },
            filter_url: [
                '/system/version',
                '/system/config/front',
                '/authorize/captcha/config',
                '/authorize/captcha/image',
                '/application/sso/bind-code',
                '/authorize/login',
                '/application/',
                '/application/sso/_all',
            ],
            requestOptions: () => {
                return {
                    lang: localStorage.getItem('lang')
                }
            },
            handleError: (description, key, err) => {
                if (!err.config?.hiddenError) {
                    notification.error({
                        style: {
                            zIndex: 1040
                        },
                        key: key as string,
                        message: '',
                        description
                    })
                }
            }
        },
    )
}


export const loadMicroApp = () => {
    (window as any).microApp?.addDataListener((data: any) => {

        if (data.token) {
            setToken(data.token)
        }

        if (data.appId) {
            LocalStore.set('appId', data.appId)
        }
    }, true)
}
