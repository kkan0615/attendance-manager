import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { adminBusiRoutes } from '@/router/modules/admins'
import { generalBusiRoutes } from '@/router/modules/generals'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'main',
    component: () => import('@/views/Main/index.vue'),
  },
  generalBusiRoutes,
  adminBusiRoutes,
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})
