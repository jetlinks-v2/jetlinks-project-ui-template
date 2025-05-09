import proMenu from './baseMenu';
import { getModulesMenu } from '@/utils/modules'

/**
 * 合并菜单数据
 * @param baseMenus 基础菜单数据
 * @param cloudMenus 云端菜单数据
 * @returns 合并后的菜单数据
 */
export const mergeMenuData = (baseMenus: any[], cloudMenus: any[]): any[] => {
  const result = [...baseMenus]
  cloudMenus.forEach(cloudMenu => {
    const existingMenuIndex = result.findIndex(menu => menu.code === cloudMenu.code)

    if (existingMenuIndex === -1) {
      // 如果不存在相同code的菜单，直接添加
      result.push(cloudMenu)
    } else {
      // 如果存在相同code的菜单，合并children
      if (cloudMenu.children && result[existingMenuIndex].children) {
        result[existingMenuIndex].children = mergeMenuData(
          result[existingMenuIndex].children,
          cloudMenu.children
        )
      } else if (cloudMenu.children) {
        result[existingMenuIndex].children = cloudMenu.children
      }
    }
  })

  return result
}

export const handleMenuOptions = (menus: any[], p: { id: string, name: string}): any[] => menus.map(item => ({
  ...item,
  children: item.children ? handleMenuOptions(item.children, p) : undefined,
  options: { appName: p.id || p.name, ...item.options }
}))

export default (): any[] => {
  let baseModuleMenu: any = [...proMenu]
  getModulesMenu().forEach((item) => {
    baseModuleMenu = mergeMenuData(baseModuleMenu, item)
  })
  return baseModuleMenu
}
