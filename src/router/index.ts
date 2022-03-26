import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { busiRoutes } from '@/router/modules/businesses'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/views/Home/index.vue'),
  },
  ...busiRoutes,
]

export const router = createRouter({
  history: createWebHistory(''),
  routes,
})
