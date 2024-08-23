import { defineStore } from 'pinia'
import router from '@/router'
import { cloneDeep } from 'lodash-es'
import { setParamsValue } from '@jetlinks-web/hooks'
import { onlyMessage } from '@jetlinks-web/utils'
import { handleMenus, handleMenusMap, handleSiderMenu } from '@/utils'
import { getOwnMenuThree } from '@/api/system/menu'
import { getGlobModules } from '@/router/globModules'
import { extraMenu } from '@/router/extraMenu'
import { USER_CENTER_ROUTE , INIT_HOME } from '@/router/basic'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
import {OWNER_KEY} from "@/utils/consts";

const defaultOwnParams = [
  {
    terms: [
      {
        terms: [
          {
            column: 'owner',
            termType: 'eq',
            value: OWNER_KEY,
          },
          {
            column: 'owner',
            termType: 'isnull',
            value: '1',
            type: 'or',
          },
        ],
      },
    ],
  },
]

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<any[]>([])
  const menusMap = ref<Map<string, any>>(new Map())
  const siderMenus = ref([])

  const authStore = useAuthStore()
  const userStore = useUserStore()

  const hasRouteMenu = () => {
    return !!Object.keys(menu).length
  }

  const hasMenu = (code: string) => {
    return menusMap.value.has(code)
  }

  /**
   * 页面跳转
   * @param name 路由name
   * @param param1 {Object} 需要传递的参数
   */
  const jumpPage = (
    name: string,
    {
      params,
      query,
    }: {
      params?: Record<string, any>
      query?: Record<string, any>
    },
  ) => {
    if (hasMenu(name)) {
      router.push({name, params, query})
      setParamsValue(name, params)
    } else {
      onlyMessage('暂无权限，请联系管理员', 'error')
      console.warn(`没有找到对应的页面: ${ name }`)
    }
  }
  const routerPush = (
    name: string,
    {
      params,
      query,
    }: {
      params?: Record<string, any>
      query?: Record<string, any>
    },
  ) => {
    router.push({
      name,
      params,
      query,
      state: {params},
    })
    setParamsValue(name, params)
  }

  const mergeExtraMenu = () => {
    const pluginMenu = userStore.pluginMenu
    const cloneMerger = Object.assign(cloneDeep(extraMenu), cloneDeep(pluginMenu))

    Object.keys(cloneMerger).forEach(key => {
      if (extraMenu[key]) {
        const menuMap = new Map()
        cloneMerger[key].forEach(item => {
          menuMap.set(item.code, item)
        })
        extraMenu[key].forEach(item => {
          menuMap.set(item.code, item)
        })

        cloneMerger[key] = [...menuMap.values()]
      }
    })

    return cloneMerger
  }
  const handleMenusMapById = (item: { name: string; path: string }) => {
    const {name, path} = item
    menusMap.value.set(name, {path})
  }

  const queryMenus = async () => {
    const resp = await getOwnMenuThree({
      paging: false,
      terms: defaultOwnParams,
    })
    const asyncRoutes = getGlobModules()
    menusMap.value.clear()

    const mergeMenu = mergeExtraMenu()

    if (resp.success) {
      const routes = handleMenus(cloneDeep(resp.result), mergeMenu, asyncRoutes) // 处理路由
      if (routes.length) {
        routes.push({
          path: '/',
          redirect: routes[0].path,
        })
      }

      routes.push(USER_CENTER_ROUTE) // 添加个人中心
      routes.push(INIT_HOME) // 添加初始化页面
      authStore.handlePermission(resp.result) // 处理按钮权限
      menu.value = routes
      handleMenusMap(routes, handleMenusMapById)
      siderMenus.value = handleSiderMenu(cloneDeep(resp.result), userStore.pluginMenu) // 处理菜单
    }
  }

  return {
    menu,
    siderMenus,
    menusMap,
    hasRouteMenu,
    hasMenu,
    jumpPage,
    routerPush,
    queryMenus,
  }
})
