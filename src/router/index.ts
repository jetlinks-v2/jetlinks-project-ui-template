import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getToken, removeToken } from '@jetlinks-web/utils'
import { NOT_FIND_ROUTE, LOGIN_ROUTE, DEMO, AUTHORIZE_ROUTE, RouteRecordItem } from './basic'
import { useUserStore } from '@/store/user'
import { useSystemStore } from '@/store/system'
import { useMenuStore } from '@/store/menu'
import { isSubApp } from '@/utils'
import { useApplication } from '@/store'
import microApp from '@micro-zoe/micro-app'
import { modules } from '@/utils/modules'

let TokenFilterRoute: string[] = [DEMO.path, AUTHORIZE_ROUTE.path]

let FilterPath: string[] = [DEMO.path, AUTHORIZE_ROUTE.path]

// 获取子模块默认路由
const getModulesRoutes = () => {
  const modulesFile = modules()
  const _routes: RouteRecordItem[] = []
  Object.keys(modulesFile).forEach((key) => {
    if ((modulesFile[key] as any).default) {
      const routes = (modulesFile[key] as any).default.getDefaultRoutes?.()
      const filter = (modulesFile[key] as any).default.getFilterRoutes?.()
      routes?.length && _routes.push(...routes)
      filter?.length && TokenFilterRoute.push(...filter)
    }
  })
  return _routes
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [LOGIN_ROUTE, DEMO, AUTHORIZE_ROUTE, ...getModulesRoutes()],
  scrollBehavior(to, form, savedPosition) {
    return savedPosition || { top: 0 }
  }
})
microApp.router.setBaseAppRouter(router)
const NoTokenJump = (to: any, next: any, isLogin: boolean) => {
  // 登录页，不需要token 的页面直接放行，否则跳转登录页
  if (isLogin || TokenFilterRoute.includes(to.path)) {
    next()
  } else {
    next({ path: LOGIN_ROUTE.path })
  }
}

const getRoutesByServer = async (to: any, next: any) => {
  const UserInfoStore = useUserStore()
  const SystemStore = useSystemStore()
  const MenuStore = useMenuStore()
  const application = useApplication()

  if (!Object.keys(UserInfoStore.userInfo).length) {
    // 没有用户信息
    // 获取有用户信息
    await UserInfoStore.getUserInfo()
    //
    await SystemStore.queryVersion()
    await SystemStore.queryInfo()
    await SystemStore.setMircoData()
  }

  if (!isSubApp && !application.appList.length) {
    await application.queryApplication() // 获取子应用
  }

  // 没有菜单的情况下获取菜单
  if (!MenuStore.menu.length && !FilterPath.includes(to.path as string)) {
    //
    await MenuStore.queryMenus()
    if (!MenuStore.menu) {
      // 请求之后还是没有页面，跳转异常处理页面
      next()
    } else {
      MenuStore.menu.forEach((r) => {
        router.addRoute(r)
      })
      router.addRoute(NOT_FIND_ROUTE)
      await next({ ...to, replace: true })
    }
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  const token = getToken()
  const isLogin = to.path === LOGIN_ROUTE.path
  if (token) {
    if (isLogin) {
      next({ path: '/' })
    } else {
      getRoutesByServer(to, next)
    }
  } else {
    NoTokenJump(to, next, isLogin)
  }
})

export const jumpLogin = () => {
  setTimeout(() => {
    removeToken()
    router.replace({
      path: LOGIN_ROUTE.path
    })
  })
}

export default router
