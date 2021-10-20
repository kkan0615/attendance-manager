import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { adminBusiRoutes } from '@/router/modules/admins'
import { generalBusiRoutes } from '@/router/modules/generals'
import { myRoutes } from '@/router/modules/mys'

export const routes: Array<RouteRecordRaw> = [
  myRoutes,
  generalBusiRoutes,
  adminBusiRoutes,
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})
