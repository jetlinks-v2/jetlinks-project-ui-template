import {initWebSocket} from "@/utils/websocket";
import {getToken, LocalStore, setToken} from "@jetlinks-web/utils";
import {BASE_API, TOKEN_KEY} from "@jetlinks-web/constants";
import {crateAxios} from '@jetlinks-web/core'
import {jumpLogin} from '@/router'

/**
 * 初始化package
 */
export const initPackages = () => {

    /**
     * 初始化websocket
     */
    const _initWs = () => {
        const token = getToken();

        if (!token) return

        const protocol = window.location.protocol === "https" ? "wss://" : "ws://";
        const host = document.location.host;
        const url = `${protocol}${host}${BASE_API}/messaging/${token}?:${TOKEN_KEY}=${token}`;

        initWebSocket(url);
    };

    _initWs();
};

export const initAxios = () => {
    crateAxios(
        {
            tokenExpiration: () => {
                jumpLogin()
            },
            filter_url: [],
            requestOptions: () => {
                return {
                    lang: localStorage.getItem('lang')
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
