import { RouteRecordRaw } from 'vue-router'
import { busiMyRoutes } from '@/router/modules/businesses/mys'
import { busiAdminRoutes } from '@/router/modules/businesses/admins'

export const busiRoutes: RouteRecordRaw[] = [
  {
    path: '/business/:busiId',
    name: 'BusinessLayout',
    component: () => import('@/views/businesses/index.vue'),
    redirect: import.meta.env.MODE === 'production' ? undefined : { name: 'BusiMyLayout', params: { busiId: 1 } },
    meta: { isBusi: true },
    children: [
      ...busiMyRoutes,
      ...busiAdminRoutes,
    ]
  },
]
