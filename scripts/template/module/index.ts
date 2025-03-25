const routerModules = import.meta.glob('./views/**/index.vue')
import { getModuleRoutesMap } from '@jetlinks-web/utils'

/**
 * 额外子路由是独立于菜单管理之外的页面，比如详情，新增表单页；它们需要挂载在指定路由下。
 * @return
 * {
 *  'device/Product': {
 *    children: [
 *      {
 *          code: 'Detail',
 *          url: '/detail/:id',
 *          name: i18n.global.t('device-manager-ui.index.106686-0'),
 *          component: () => import('./views/device/Product/Detail/index.vue')
 *      }
 *    ]
 *  }
 * }
 */
const getExtraRoutesMap = () => ({})

/**
 * 拓展组件，某些页面的功能或者组件是需要挂载该模块才会显示。这时候就需要子模块将功能抛出，比如组织管理下，当挂载设备管理模块时，加载产品、设备标签
 * @return
 * {
 *    "department": [
 *          {
 *              name: 'product',
 *              label: 'Department.index.945805-0',
 *              component:  defineAsyncComponent(() => import('./views/department/product/index.vue'))
 *          }
 *      ]
 * }
 */
const getComponents = () => ({})

export default {
  getAsyncRoutesMap: () => getModuleRoutesMap(routerModules),
  getExtraRoutesMap,
  getComponents
}
