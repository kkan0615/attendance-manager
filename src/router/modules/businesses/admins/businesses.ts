import { RouteRecordRaw } from 'vue-router'
import { BusiUserAuth } from '@/types/models/users/business'

export const busiAdminBusinessRoutes: RouteRecordRaw[] = [
  {
    path: 'business',
    name: 'BusiAdminBusinessLayout',
    component: () => import('@/views/businesses/admins/businesses/index.vue'),
    redirect: { name: 'BusiAdminBusinessMain' },
    meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
    children: [
      {
        path: '',
        name: 'BusiAdminBusinessMain',
        component: () => import('@/views/businesses/admins/businesses/Main/index.vue'),
        meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
      },
    ]
  },
]
