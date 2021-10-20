import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import MyBaseLayout from '@/layouts/mys/Base/index.vue'

export const myRoutes: RouteRecordRaw = {
  path: '/',
  name: RouterNameEnum.MY_BASE_LAYOUT,
  component: MyBaseLayout,
  meta: {
    isGuild: true,
  },
  children: [
    {
      path: '',
      name: RouterNameEnum.MY_MAIN,
      component: () => import('@/views/mys/Main/index.vue'),
    },
  ]
}
