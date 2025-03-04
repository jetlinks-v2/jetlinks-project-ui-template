import proMenu from './baseMenu';
import { getModulesMenu } from '@/utils/modules'

const baseModuleMenu = [...proMenu];
getModulesMenu().forEach((item) => {
  baseModuleMenu.push(...item);
})

export default [
  ...baseModuleMenu,
]
