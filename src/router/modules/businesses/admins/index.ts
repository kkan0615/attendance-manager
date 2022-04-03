import { RouteRecordRaw } from 'vue-router'
import { busiAdminQRCodeRoutes } from '@/router/modules/businesses/admins/qrcodes'
import { busiAdminUserRoutes } from '@/router/modules/businesses/admins/users'
import { busiAdminBusinessRoutes } from '@/router/modules/businesses/admins/businesses'

export const busiAdminRoutes: RouteRecordRaw[] = [
  {
    path: 'admin',
    name: 'BusiAdminLayout',
    component: () => import('@/views/businesses/admins/index.vue'),
    // redirect: { name: 'BusiAdminMain' },
    meta: { isBusi: true },
    children: [
      ...busiAdminQRCodeRoutes,
      ...busiAdminUserRoutes,
      ...busiAdminBusinessRoutes,
    ]
  },
]
