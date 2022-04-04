import { RouteRecordRaw } from 'vue-router'
import { BusiUserAuth } from '@/types/models/users/business'

export const busiAdminQRCodeRoutes: RouteRecordRaw[] = [
  {
    path: 'qrcode',
    name: 'BusiAdminQRCodeLayout',
    component: () => import('@/views/businesses/admins/qrcodes/index.vue'),
    redirect: { name: 'BusiAdminQRCodeMain' },
    meta: { isBusi: true, roles: ['system', 'admin', 'superAdmin'] as BusiUserAuth[] },
    children: [
      {
        path: '',
        name: 'BusiAdminQRCodeMain',
        component: () => import('@/views/businesses/admins/qrcodes/Main/index.vue'),
        meta: { isBusi: true, roles: ['system', 'admin', 'superAdmin'] as BusiUserAuth[] },
      }
    ]
  },
]
