import { getToken, LocalStore, setToken } from '@jetlinks-web/utils'
import { BASE_API, TOKEN_KEY_URL } from '@jetlinks-web/constants'
import { crateAxios, wsClient, instance } from '@jetlinks-web/core'
import { jumpLogin } from '@/router'
import { notification } from 'ant-design-vue'
import { langKey } from '@/utils/consts'

/**
 * 初始化package
 */
export const initPackages = () => {
  /**
   * 初始化websocket
   */
  const token = getToken()

  if (!token) return

  const protocol = window.location.protocol === 'https' ? 'wss://' : 'ws://'
  const host = document.location.host
  const url = `${protocol}${host}${BASE_API}/messaging/${token}?${TOKEN_KEY_URL}=${token}`

  wsClient.initWebSocket(url)
  wsClient.connect()
}

export const initAxios = () => {
  crateAxios({
    langKey: langKey,
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
      '/personal/token/'
    ],
    handleError: (description, key, err) => {
      if (!err.config.hiddenError) {
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
  });
  (window as any).JetlinksCore = {
    instance
  }
}

export const loadMicroApp = () => {
  ;(window as any).microApp?.addDataListener((data: any) => {
    if (data.token) {
      setToken(data.token)
    }

    if (data.appId) {
      LocalStore.set('appId', data.appId)
    }
  }, true)
}
