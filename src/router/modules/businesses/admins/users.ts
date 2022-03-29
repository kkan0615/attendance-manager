import { RouteRecordRaw } from 'vue-router'

export const busiAdminUserRoutes: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'BusiAdminUserLayout',
    component: () => import('@/views/businesses/admins/users/index.vue'),
    redirect: { name: 'BusiAdminUserList' },
    meta: { isBusi: true },
    children: [
      {
        path: '',
        name: 'BusiAdminUserList',
        component: () => import('@/views/businesses/admins/users/List/index.vue'),
        meta: { isBusi: true },
      }
    ]
  },
]
