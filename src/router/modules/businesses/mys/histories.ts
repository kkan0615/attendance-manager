import { RouteRecordRaw } from 'vue-router'

export const busiHistoryRoutes: RouteRecordRaw[] = [
  {
    path: 'history',
    name: 'BusiMyHistoryLayout',
    component: () => import('@/views/businesses/mys/histories/index.vue'),
    redirect: { name: 'BusiMyHistoryMain' },
    meta: { isBusi: true },
    children: [
      {
        path: '',
        name: 'BusiMyHistoryMain',
        component: () => import('@/views/businesses/mys/histories/Main/index.vue'),
        meta: { isBusi: true },
      }
    ]
  },
]
