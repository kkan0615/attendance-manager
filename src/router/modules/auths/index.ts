import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import AuthBaseLayout from '@/layouts/auths/Base/index.vue'

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: RouterNameEnum.AUTH_BASE_LAYOUT,
  component: AuthBaseLayout,
  children: [
    {
      path: 'login',
      name: RouterNameEnum.AUTH_LOGIN,
      component: () => import('@/views/auths/Login/index.vue'),
    },
    {
      path: 'busi/:busiId/login',
      name: RouterNameEnum.AUTH_BUSINESS_LOGIN,
      component: () => import('@/views/auths/Login/index.vue'),
    },
    {
      path: 'busi/:busiId/admin/login',
      name: RouterNameEnum.AUTH_BUSINESS_ADMIN_LOGIN,
      component: () => import('@/views/auths/Login/index.vue'),
    },
  ]
}
