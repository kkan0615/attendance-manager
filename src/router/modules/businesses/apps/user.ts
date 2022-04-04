import { RouteRecordRaw } from 'vue-router'

export const busiAppUserRoutes: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'BusiAppUserLayout',
    component: () => import('@/views/businesses/apps/users/index.vue'),
    redirect: { name: 'BusiAppUserMain' },
    meta: { isBusi: true },
    children: [
      {
        path: '',
        name: 'BusiAppUserMain',
        component: () => import('@/views/businesses/apps/users/Main/index.vue'),
        meta: { isBusi: true },
      }
    ]
  },
]
