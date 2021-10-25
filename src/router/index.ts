import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { myRoutes } from '@/router/modules/mys'
import { authRoutes } from '@/router/modules/auths'
import { generalBusiRoutes } from '@/router/modules/generals'
import { adminBusiRoutes } from '@/router/modules/admins'

export const routes: Array<RouteRecordRaw> = [
  myRoutes,
  authRoutes,
  generalBusiRoutes,
  adminBusiRoutes,
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})
