import {RouteRecordItem} from "@jetlinks-web/types";

export const USER_CENTER_ROUTE: RouteRecordItem = {
  path: '/account',
  name: 'Account',
  redirect: '/account/center',
  component: () => import('@/layout/BasicLayoutPage.vue'),
  meta: {
    title: '个人中心',
    hideInMenu: true
  },
  children: [
    {
      path: '/account/center',
      name: 'account/center',
      meta: {
        title: '基本设置',
        icon: '',
        hideInMenu: false
      },
      component: () => import('@/views/account/center/index.vue'),
    },
  ]
}

export const LOGIN_ROUTE: RouteRecordItem = {
  path: '/login',
  name: 'Login',
  // @ts-ignore
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录页'
  }
}
