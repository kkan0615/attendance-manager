import { RouterNameEnum } from '@/types/systems/routers/keys'
import { RouteRecordRaw } from 'vue-router'
import HomeGeneralLayout from '@/layouts/generals/Home/index.vue'

export const generalHomeRoutes: Array<RouteRecordRaw> = [
  {
    path: 'home',
    name: RouterNameEnum.GENERAL_HOME_LAYOUT,
    component: HomeGeneralLayout,
    redirect: { name: RouterNameEnum.GENERAL_HOME_LAYOUT },
    children: [
      {
        path: '',
        name: RouterNameEnum.GENERAL_HOME_MAIN,
        component: () => import('@/views/generals/Home/index.vue'),
      },
    ]
  },
]
