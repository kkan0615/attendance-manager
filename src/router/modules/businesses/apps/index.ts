import { RouteRecordRaw } from 'vue-router'
import { busiAppUserRoutes } from '@/router/modules/businesses/apps/user'
import { busiAppPostRoutes } from '@/router/modules/businesses/apps/post'

export const busiAppRoutes: RouteRecordRaw[] = [
  {
    path: 'app',
    name: 'BusiAppLayout',
    component: () => import('@/views/businesses/apps/index.vue'),
    redirect: { name: 'BusiAppHome' },
    meta: { isBusi: true },
    children: [
      {
        path: 'home',
        name: 'BusiAppHome',
        component: () => import('@/views/businesses/apps/Home/index.vue'),
        meta: { isBusi: true },
      },
      ...busiAppUserRoutes,
      ...busiAppPostRoutes,
    ]
  },
]
