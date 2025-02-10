const modulesFiles = import.meta.glob('../modules/*/index.ts', { eager: true})

export const getExtraRouters = () => {
  const extraMenu = {
    'system/Role': [{ // 角色管理
      code: 'Detail',
      url: '/Detail/:id',
      name: '角色详情'
    }],
    'system/Menu': [
      {
        code: 'Setting',
        url: '/Setting',
        name: '菜单配置'
      },
      {
        code: 'Detail',
        url: '/Detail/:id',
        name: '菜单详情'
      },
    ]
  }


  Object.keys(modulesFiles).forEach(key => {
    const routes = (modulesFiles[key] as any).default.getExtraRoutesMap()
    Object.assign(extraMenu, routes)
  })

  return extraMenu
}
