import { RouteRecordRaw } from 'vue-router'
import { BusiUserAuth } from '@/types/models/users/business'

export const busiAdminAnalysisRoutes: RouteRecordRaw[] = [
  {
    path: 'analysis',
    name: 'BusiAdminAnalysisLayout',
    component: () => import('@/views/businesses/admins/analysis/index.vue'),
    redirect: { name: 'BusiAdminAnalysisMain' },
    meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
    children: [
      {
        path: '',
        name: 'BusiAdminAnalysisMain',
        component: () => import('@/views/businesses/admins/analysis/Main/index.vue'),
        meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
      },
    ]
  },
]
