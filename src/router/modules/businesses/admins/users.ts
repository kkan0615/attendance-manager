import { RouteRecordRaw } from 'vue-router'
import { BusiUserAuth } from '@/types/models/users/business'

export const busiAdminUserRoutes: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'BusiAdminUserLayout',
    component: () => import('@/views/businesses/admins/users/index.vue'),
    redirect: { name: 'BusiAdminUserList' },
    meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
    children: [
      {
        path: '',
        name: 'BusiAdminUserList',
        component: () => import('@/views/businesses/admins/users/List/index.vue'),
        meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
      },
      {
        path: 'form/id/:id',
        name: 'BusiAdminUserUpdateForm',
        component: () => import('@/views/businesses/admins/users/Form/index.vue'),
        meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
      },
      {
        path: 'detail/id/:id',
        name: 'BusiAdminUserDetail',
        component: () => import('@/views/businesses/admins/users/Detail/index.vue'),
        meta: { isBusi: true, roles: ['admin', 'superAdmin'] as BusiUserAuth[] },
      }
    ]
  },
]
