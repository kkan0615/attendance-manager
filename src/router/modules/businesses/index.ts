import { RouteRecordRaw } from 'vue-router'
import { busiMyRoutes } from '@/router/modules/businesses/mys'

export const busiRoutes: RouteRecordRaw[] = [
  {
    path: '/business/:id',
    name: 'BusinessLayout',
    component: () => import('@/views/businesses/index.vue'),
    redirect: import.meta.env.MODE === 'production' ? undefined : { name: 'BusinessMyHome', params: { id: 'test' } },
    meta: { isBusi: true },
    children: [
      ...busiMyRoutes,
    ]
  },
]