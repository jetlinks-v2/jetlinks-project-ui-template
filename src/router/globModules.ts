import { modules } from '@/utils/modules'

const routerModules = import.meta.glob('../views/**/index.vue')

export const getAsyncRoutesMap = () => {
  const modules = {}
  Object.keys(routerModules).forEach(item => {
    const code = item.replace('../views/', '').replace('/index.vue', '')

    modules[code] = routerModules[item]
  })

  return modules
}


export const getGlobModules = () => {
  const asyncRoutesMap = getAsyncRoutesMap()
  const modulesFile = modules()
  Object.keys(modulesFile).forEach(key => {
    const routes = (modulesFile[key] as any).default.getAsyncRoutesMap()
    Object.assign(asyncRoutesMap, routes)
  })

  return {
    ...asyncRoutesMap
  }
}
