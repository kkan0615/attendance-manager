import { RouteRecordRaw } from 'vue-router'

export const busiAdminQRCodeRoutes: RouteRecordRaw[] = [
  {
    path: 'qrcode',
    name: 'BusiAdminQRCodeLayout',
    component: () => import('@/views/businesses/admins/qrcodes/index.vue'),
    redirect: { name: 'BusiAdminQRCodeMain' },
    meta: { isBusi: true },
    children: [
      {
        path: '',
        name: 'BusiAdminQRCodeMain',
        component: () => import('@/views/businesses/admins/qrcodes/Main/index.vue'),
        meta: { isBusi: true },
      }
    ]
  },
]
