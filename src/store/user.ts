import { defineStore } from 'pinia'
import { detail } from '@/api/user'

type UserInfo = {
    name: string
    icon: string
}

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<Partial<UserInfo>>({})
    const isAdmin = ref(false)

    /**
     * 设置用户信息
     * @param data
     */
    const setUserInfo = (data: Partial<UserInfo>) => {
        userInfo.value = data
    }

    /**
    * 获取用户信息
    */
    const getUserInfo = async () => {
        const resp = await detail()
        if (resp.success) {
          setUserInfo(resp.result)
          isAdmin.value = resp.result.username === 'admin'
        }
    }

    return {
        userInfo,
        getUserInfo,
        setUserInfo
    }
})
