import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isArray } from 'lodash-es'

const getAuthItem = () => {

}

export const useAuthStore = defineStore('auth', () => {
    const permissions = ref<Record<string, string[]>>({})

    const setPermission = (code: string, buttons: string[]) => {
      permissions.value[code] = buttons
    }

    const cleanPermission = () => {
      permissions.value = {}
    }

    const getPermission = (code: string): string[] => {

      if (code) {
        return permissions.value[code]
      }

      return []
    }

    const handlePermission = (data: any) => {

    }

    return {
      permissions,
      getPermission,
      setPermission,
      cleanPermission,
      handlePermission
    }
})
