import type { RouteRecordRaw } from 'vue-router';

export const USER_CENTER_ROUTE: RouteRecordRaw = {
  path: '/account',
  name: 'Account',
  redirect: '/account/center',
  component: () => import('@/layout/BasicLayoutPage.vue'),
  meta: {
    title: '个人中心',
    hideInMenu: true,
  },
  children: [
    {
      path: '/account/center',
      name: 'account/center',
      meta: {
        title: '基本设置',
        icon: '',
        hideInMenu: false,
      },
      component: () => import('@/views/account/center/index.vue'),
    },
  ],
};

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  // @ts-ignore
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录页',
  },
};

export const NOT_FIND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)',
  name: 'error',
  component: () => import('@/views/Error/404.vue'),
  meta: {
    title: '404',
  },
};

export const INIT_HOME: RouteRecordRaw = {
  path: '/init-home',
  name: 'init-home',
  component: () => import('@/views/init-home/index.vue'),
  meta: {
    title: '初始化',
  },
};

export const DEMO: RouteRecordRaw = {
  path: '/demo',
  name: 'demo',
  component: () => import('@/views/demo/index.vue'),
  meta: {
    title: 'demo',
  },
};
