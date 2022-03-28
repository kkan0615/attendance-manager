import { RouteRecordRaw } from 'vue-router'

export const busiMyScheduleRoutes: RouteRecordRaw[] = [
  {
    path: 'schedule',
    name: 'BusiMyScheduleLayout',
    component: () => import('@/views/businesses/mys/schedules/index.vue'),
    redirect: { name: 'BusiMyScheduleMain' },
    meta: { isBusi: true },
    children: [
      {
        path: '',
        name: 'BusiMyScheduleMain',
        component: () => import('@/views/businesses/mys/schedules/Main/index.vue'),
        meta: { isBusi: true },
      }
    ]
  },
]
