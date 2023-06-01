import { ref } from 'vue'
import type { Ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import {isArray} from "lodash-es";

/**
 *
 * @param code {string | string[]} menuCode:buttonCode 或者['menuCode:buttonCode', 'menuCode:buttonCode'] 数组取并且
 */
export const usePermission = (code: string | string[]): {
  permission: Ref<string[]>
  hasPermission: Ref<boolean>
} => {
  const permission = ref<string[]>([])
  const hasPermission = ref<boolean>(false)

  const authStore = useAuthStore()

  const getPermission = (code: string) => {
    let buttons: string[] = []
    let hasButton: boolean = false
    if (code.includes(':')) {
      const [menuCode, buttonCode] = code.split(':')
      buttons = authStore.getPermission(menuCode) || []
      hasButton = buttons.includes(buttonCode)
    }

    return {
      buttons,
      hasButton
    }
  }

  /**
   * 根据菜单code获取对应的按钮权限
   * @param code
   */
  const initPermission = (code: string | string[]) => {
    if (isArray(code)) {
      let _buttons: string[] = []
      hasPermission.value = code.every(codeItem => {
        const { buttons, hasButton } = getPermission(codeItem)
        _buttons = [...buttons, ..._buttons]
        return hasButton
      })
      permission.value = [...new Set(_buttons)]
    } else if (code) {
      const { buttons, hasButton } = getPermission(code)
      permission.value = buttons
      hasPermission.value = hasButton
    }
  }

  initPermission(code)

  return {
    permission,
    hasPermission
  }
}
