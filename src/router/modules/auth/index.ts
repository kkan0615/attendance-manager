import { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'AuthLayout',
    component: () => import('@/views/auths/index.vue'),
    redirect: { name: 'AuthLogin' },
    children: [
      {
        path: 'login',
        name: 'AuthLogin',
        component: () => import('@/views/auths/Login/index.vue'),
      },
      {
        path: 'logout',
        name: 'AuthLogout',
        component: () => import('@/views/auths/Logout/index.vue'),
      },
    ]
  },
]
