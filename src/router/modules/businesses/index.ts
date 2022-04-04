import { RouteRecordRaw } from 'vue-router'
import { busiMyRoutes } from '@/router/modules/businesses/mys'
import { busiAdminRoutes } from '@/router/modules/businesses/admins'
import { busiAppRoutes } from '@/router/modules/businesses/apps'

export const busiRoutes: RouteRecordRaw[] = [
  {
    path: '/business/:busiId',
    name: 'BusinessLayout',
    component: () => import('@/views/businesses/index.vue'),
    redirect: import.meta.env.MODE === 'production' ? undefined : { name: 'BusiMyLayout', params: { busiId: 'demo' } },
    meta: { isBusi: true },
    children: [
      ...busiMyRoutes,
      ...busiAppRoutes,
      ...busiAdminRoutes,
    ]
  },
]
