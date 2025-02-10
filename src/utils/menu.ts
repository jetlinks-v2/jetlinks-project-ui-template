import { BasicLayoutPage, BlankLayoutPage, Iframe } from '@/layout'
import { shallowRef } from 'vue'
import { isArray } from 'lodash-es'

type Buttons = Array<{ id: string }>

type MenuItem = {
  icon: string
  name: string
  code: string
  url: string
  isShow?: boolean
  buttons?: Buttons
  children?: MenuItem[]
  appId?: string
  component?: any
  meta?: Record<string, any>
  options?: Record<string, any>
}

const hasAppID = (item: MenuItem): { isApp: boolean; appUrl: string; isLowCodeApp?: boolean } => {
  let obj = {
    isApp: !!item.appId,
    appUrl: `/${item.appId}${item.url}`
  } as any

  const isLowCodeApp = !!item?.options?.lowCodeProjectId
  if (isLowCodeApp) {
    obj = {
      ...obj,
      isLowCodeApp
    }
  }
  return obj
}

const handleButtons = (buttons?: Buttons) => {
  return buttons?.map((b) => b.id) || []
}

const handleMeta = (item: MenuItem, isApp: boolean, isLowCodeApp?: boolean) => {
  let obj = {
    icon: item.icon,
    title: item.name,
    hideInMenu: item.isShow === false,
    buttons: handleButtons(item.buttons),
    isApp
  } as any

  if (isLowCodeApp) {
    obj = {
      ...obj,
      isLowCodeApp,
      lowCodeProjectId: item?.options?.lowCodeProjectId,
      lowCodePageFullId: item?.options?.lowCodePageFullId
    }
  }

  return obj
}

const findComponents = (
  code: string,
  level: number,
  isApp: boolean,
  isLowCodeApp: boolean,
  components: any,
  mate: any,
  hasChildren: false
) => {
  const myComponents = components[code]
  // console.log(myComponents, code, components)
  if (level === 1) {
    // BasicLayoutPage
    if (myComponents && !hasChildren) {
      return mate?.hasLayout === false
        ? () => myComponents()
        : h(
            BasicLayoutPage,
            {},
            h(
              defineAsyncComponent(() => myComponents()),
              {}
            )
          )
    }
    return myComponents ? () => myComponents() : shallowRef(BasicLayoutPage)
  } else if (level === 2) {
    // BlankLayoutPage or components
    if (isLowCodeApp) {
      // 若是低码生成的菜单会自动加入预览模块路径
      return shallowRef(components['lowCodePreview'])
    }
    return myComponents ? () => myComponents() : BlankLayoutPage
  } else if (isApp) {
    // iframe
    return () => Iframe
  } else if (myComponents) {
    // components
    return () => myComponents()
  }
  // return components['demo'] // 开发测试用
  return undefined
}

const hasExtraChildren = (item: MenuItem, extraMenus: any) => {
  const extraItem = extraMenus[item.code]

  if (!extraItem) return undefined

  const extraRoutes = isArray(extraItem) ? extraItem : extraItem.children
  if (extraItem && extraRoutes) {
    return extraRoutes.map((e: { code: any; url: any }) => ({
      ...e,
      code: `${item.code}/${e.code}`,
      url: `${item.url}${e.url}`,
      isShow: false
    }))
  }

  return undefined
}

const filterMenuCode = ['account-center']

export const handleMenus = (menuData: any, extraMenus: any, components: any, level: number = 1) => {
  if (menuData && menuData.length) {
    return menuData
      .filter((item: MenuItem) => !filterMenuCode.includes(item.code))
      .map((item: MenuItem) => {
        const { isApp, appUrl, isLowCodeApp } = hasAppID(item) // 是否为第三方程序
        const meta = handleMeta(item, isApp, isLowCodeApp)
        const route: any = {
          path: isApp ? appUrl : item.url,
          name: isApp ? appUrl : item.code,
          url: isApp ? appUrl : item.url,
          meta: meta,
          children: item.children || []
        }

        route.component =
          item.component ||
          findComponents(item.code, level, isApp, isLowCodeApp!, components, item.meta, route.children.length)

        const extraRoute = hasExtraChildren(item, extraMenus)

        if (extraRoute) {
          // 包含额外的子路由
          route.children = [...route.children, ...extraRoute]
        }

        if (route.children && route.children.length) {
          route.children = handleMenus(route.children, extraMenus, components, level + 1)
        }

        const showChildren = route.children?.filter((r: MenuItem) => !r.meta?.hideInMenu) || []

        if (route.children && route.children.length && showChildren.length) {
          route.redirect = showChildren[0].path
        }

        return route
      })
  }

  return []
}

export const handleMenusMap = (menuData: MenuItem[], cb: (data: any) => void) => {
  if (menuData && menuData.length) {
    menuData.forEach((item: MenuItem) => {
      cb(item)
      if (item.children) {
        handleMenusMap(item.children, cb)
      }
    })
  }
}

const hideInMenu = (code: string) => {
  return ['account-center', 'message-subscribe'].includes(code)
}

export const handleSiderMenu = (menuData: any) => {
  if (menuData && menuData.length) {
    return menuData.map((item: MenuItem) => {
      const { isApp, appUrl, isLowCodeApp } = hasAppID(item) // 是否为第三方程序
      const meta = handleMeta(item, isApp, isLowCodeApp)
      const route: any = {
        path: isApp ? appUrl : `${item.url}`,
        name: isApp ? appUrl : item.code,
        url: isApp ? appUrl : item.url,
        meta: meta,
        children: item.children
      }

      if (route.children && route.children.length) {
        route.children = handleSiderMenu(route.children)
      }

      route.meta.hideInMenu = hideInMenu(item.code)

      return route
    })
  }
  return []
}

export const handleAuthMenu = (menuData: MenuItem[], cb: (code: any, buttons: any) => void) => {
  if (menuData && menuData.length) {
    return menuData.forEach((item) => {
      const { code, buttons, children } = item

      if (buttons) {
        cb(
          code,
          buttons.map((a) => a.id)
        )
      }

      if (children) {
        handleAuthMenu(children, cb)
      }
    })
  }
}
