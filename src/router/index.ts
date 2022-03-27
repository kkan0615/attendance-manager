import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { busiRoutes } from '@/router/modules/businesses'
import { authRoutes } from '@/router/modules/auth'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/views/Home/index.vue'),
  },
  ...authRoutes,
  ...busiRoutes,
]

export const router = createRouter({
  history: createWebHistory(''),
  routes,
})
