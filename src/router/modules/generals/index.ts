import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import BaseGeneralLayout from '@/layouts/generals/Base/index.vue'
import { generalHomeRoutes } from '@/router/modules/generals/homes'

export const generalBusiRoutes: RouteRecordRaw = {
  path: '/admin/busi/:busiId',
  name: RouterNameEnum.GENERAL_BASE_LAYOUT,
  component: BaseGeneralLayout,
  meta: {
    isGuild: true,
  },
  children: [
    ...generalHomeRoutes,
  ]
}
