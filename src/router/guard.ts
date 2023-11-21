import { createAuthRoute, initRouteAssignStore } from '@jetlinks-web/router'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'
import { useSystemStore } from '@/store/system'
import { useAuthStore } from '@/store/auth'

async function setupRouter() {

    initRouteAssignStore({
        UserInfoStore: useUserStore(),
        MenuStore: useMenuStore(),
        SystemStore: useSystemStore(),
        AuthStore: useAuthStore()
    })

    createAuthRoute()
}

export { setupRouter }
