import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import BaseAdminLayout from '@/layouts/admins/Base/index.vue'
import { adminHomeRoutes } from '@/router/modules/admins/homes'

export const adminBusiRoutes: RouteRecordRaw = {
  path: '/admin/busi/:busiId',
  name: RouterNameEnum.ADMIN_BASE_LAYOUT,
  component: BaseAdminLayout,
  meta: {
    isGuild: true,
  },
  children: [
    ...adminHomeRoutes,
  ]
}
