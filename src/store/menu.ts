import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { userRouterParams } from '@jetlinks/hooks'
import { onlyMessage } from '@jetlinks/utils'
import { handleMenus, handleSiderMenu} from '@/utils'
import { getOwnMenuThree } from '@/api/menu'
import { getGlobModules } from '@/router/globModules'
import { extraMenu } from '@/router/extraMenu'
import { USER_CENTER_ROUTE } from "@/router/basic";
import { useAuthStore } from '@/store/auth'

type MenuItem = Record<string, string>

const defaultOwnParams = [
    {
      terms: [
        {
          terms: [
            {
              column: 'owner',
              termType: 'eq',
              value: 'iot'
            },
            {
              column: 'owner',
              termType: 'isnull',
              value: '1',
              type: 'or'
            }
          ]
        }
      ]
    }
  ]

export const useMenuStore = defineStore('menu', () => {
    const menu = ref<any[]>([])
    const siderMenus = ref([])

    const { setParamsValue } = userRouterParams()
    const authStore = useAuthStore()
    const router = useRouter()

    const hasRouteMenu = () => {
        return !!Object.keys(menu).length
    }

    const hasMenu = (code: string) => {
        return !!menu[code]
    }

    /**
     * 页面跳转
     * @param name 路由name
     * @param param1 {Object} 需要传递的参数
     */
    const jumpPage = (name: string, { params, query }: { params?: Record<string, any>, query?: Record<string, any>}) => {
        if (hasMenu[name]) {
            router.push({ name, params, query })
            setParamsValue(name, params)
        } else {
            onlyMessage('暂无权限，请联系管理员', 'error')
            console.warn(`没有找到对应的页面: ${name}`)
        } 
    }

    const queryMenus = async () => {
        const resp = await getOwnMenuThree({ paging: false, terms: defaultOwnParams })
        const asyncRoutes = getGlobModules()

        if (resp.success) {
            const routes = handleMenus(cloneDeep(resp.result), extraMenu, asyncRoutes) // 处理路由
            if (routes.length) {
              routes.push({
                path: '/',
                redirect: routes[0].path
              })
            }

            routes.push(USER_CENTER_ROUTE) // 添加个人中心
            authStore.handlePermission(resp.result) // 处理按钮权限
            menu.value = routes
            siderMenus.value = handleSiderMenu(cloneDeep(resp.result)) // 处理菜单
        }
    }

    return {
        menu,
        siderMenus,
        hasRouteMenu,
        hasMenu,
        jumpPage,
        queryMenus
    }
})
