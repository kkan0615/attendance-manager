import { RouteRecordRaw } from 'vue-router'

export const busiAdminBusinessRoutes: RouteRecordRaw[] = [
  {
    path: 'business',
    name: 'BusiAdminBusinessLayout',
    component: () => import('@/views/businesses/admins/businesses/index.vue'),
    redirect: { name: 'BusiAdminBusinessMain' },
    meta: { isBusi: true },
    children: [
      {
        path: '',
        name: 'BusiAdminBusinessMain',
        component: () => import('@/views/businesses/admins/businesses/Main/index.vue'),
        meta: { isBusi: true },
      },
    ]
  },
]
