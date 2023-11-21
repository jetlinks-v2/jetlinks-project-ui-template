import {defineStore} from "pinia";
import { getImage } from '@jetlinks-web/utils'
import { settingDetail } from '@/api/system'

interface LayoutType {
  siderWidth: number
  headerHeight: number
  collapsedWidth: number
  title: string
  logo: string
  layout: 'mix' | 'side' | 'top'
}
export const useSystemStore = defineStore('system', () => {
  const theme = ref<string>('light') // 主题色
  const title = ref<string>('Jetlinks') // 浏览器标签页title
  const ico = ref<string>('/favicon.ico') // 浏览器标签页logo
  const systemInfo = ref<Record<string, any>>({})
  const amapKey = ref('')

  const layout = reactive<LayoutType>({
    siderWidth: 208,
    headerHeight: 48,
    collapsedWidth: 48,
    title: '物联网平台',
    logo: getImage('/login/logo.png'),
    layout: 'mix'
  })

  /**
   * 切换主题色
   * @param type
   */
  const changeTheme = (type: string) => {
    theme.value = type
  }

  /**
   * 修改其它配置项
   * @param code
   * @param value
   */
  const changeLayout = (code: string, value: string | number) => {
    layout[code] = value
  }

  /**
   * 修改浏览器标签ico
   * @param url
   */
  const changeIco = (url: string) => {
    ico.value = url
    const icoDom: any = document.querySelector('link[rel="icon"]')!;
    icoDom.href = url
  }

  const changeTitle = (value: string) => {
    document.title = value
  }

  const queryAmap = async () => {
    const resp = await settingDetail('amap')
    if (resp.success) {
      const { apiKey } = resp.result
      amapKey.value = apiKey
      systemInfo.value.apiKey = apiKey
    }
  }

  const queryInfo = async () => {
    const resp = await settingDetail('front')
    if (resp.success) {
      const { ico, title, headerTheme, logo } = resp.result
      changeIco(ico)
      changeTitle(title)
      systemInfo.value = resp.result
      layout.title = title
      layout.logo = logo
      theme.value = headerTheme
    }
    await queryAmap()
  }


  return {
    systemInfo,
    theme,
    title,
    ico,
    layout,
    changeTheme,
    changeLayout,
    changeIco,
    changeTitle,
    queryInfo
  }
})
