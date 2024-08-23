import { defineStore } from 'pinia'
import { detail } from '@/api/system/user'
import { tabList } from "@/views/account/center/data";
import {getSearchHistory} from "@/api/comm";

type UserInfo = {
  name: string
  icon: string
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Partial<UserInfo>>({})
  const isAdmin = ref(false)
  const tabKey = ref(tabList?.[0]?.key || 'HomeView') // 个人中心的tabKey,
  const other = {
    tabKey: '' // 站内信的tabkey
  }
  const alarmUpdateCount = ref(0)
  const pluginContext = ref({})
  const pluginMenu = ref({})
  /**
   * 设置用户信息
   * @param data
   */
  const setUserInfo = (data: Partial<UserInfo>) => {
    userInfo.value = data
  }

  /**
   * 获取用户信息
   */
  const getUserInfo = async () => {
    const resp = await detail()
    if (resp.success) {
      setUserInfo(resp.result)
      isAdmin.value = resp.result.username === 'admin'
    }
  }
  const updateAlarm = () => {
    alarmUpdateCount.value += 1
  }

  const getPluginPage = () => {
    getSearchHistory('web-plugin').then(resp => {
      const renderMap = {}
      const renderMenuMap = {}

      if (resp.success) {
        resp.result.forEach(item => {
          try {
            const content = JSON.parse(item.content)

            if (content.page?.isPage && content.code) {
              const pageItem = {
                code: content.page.code,
                url: content.page.url,
                name: content.page.name,
                component: 'PluginPage',
                isPlugin: true,
                parentCode: content.code,
                pluginPageCode: content.page.code
              }

              if (renderMenuMap[content.code]) {
                renderMenuMap[content.code].push(pageItem)
              } else {
                renderMenuMap[content.code] = [pageItem]
              }
            }

            if (content.observe) {
              renderMap[content.code] = {
                ...(renderMap[content.code] || {}),
                [content.observe]: content.render
              }
            } else {
              if (!renderMap[content.code]) {
                renderMap[content.code] = [content]
              } else {
                renderMap[content.code].push(content)
              }
            }
          } catch (e) {
            console.warn(e)
          }
        })
      }

      pluginContext.value = renderMap
      pluginMenu.value = renderMenuMap
    })
  }

  return {
    tabKey,
    other,
    userInfo,
    alarmUpdateCount,
    isAdmin,
    pluginContext,
    pluginMenu,
    getUserInfo,
    setUserInfo,
    updateAlarm,
    getPluginPage
  }
})
