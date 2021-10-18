import { RouterNameEnum } from '@/types/systems/routers/keys'
import { RouteRecordRaw } from 'vue-router'
import AdminHomeLayout from '@/layouts/admins/Home/index.vue'

export const adminHomeRoutes: Array<RouteRecordRaw> = [
  {
    path: 'home',
    name: RouterNameEnum.ADMIN_HOME_LAYOUT,
    component: AdminHomeLayout,
    redirect: { name: RouterNameEnum.ADMIN_HOME_MAIN },
    children: [
      {
        path: '',
        name: RouterNameEnum.ADMIN_HOME_MAIN,
        component: () => import('@/views/admins/Home/index.vue'),
      },
    ]
  },
]
