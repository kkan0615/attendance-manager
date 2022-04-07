import { RouteRecordRaw } from 'vue-router'
import { busiHistoryRoutes } from '@/router/modules/businesses/mys/histories'
import { busiMyScheduleRoutes } from '@/router/modules/businesses/mys/schedules'

export const busiMyRoutes: RouteRecordRaw[] = [
  {
    path: 'my',
    name: 'BusiMyLayout',
    component: () => import('@/views/businesses/mys/index.vue'),
    redirect: { name: 'BusiMyHome' },
    meta: { isBusi: true },
    children: [
      {
        path: 'home',
        name: 'BusiMyHome',
        component: () => import('@/views/businesses/mys/Home/index.vue'),
        meta: { isBusi: true },
      },
      {
        path: 'form',
        name: 'BusiMyForm',
        component: () => import('@/views/businesses/mys/Form/index.vue'),
        meta: { isBusi: true },
      },
      ...busiMyScheduleRoutes,
      ...busiHistoryRoutes,
    ]
  },
]
