import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authRoutes } from '@/router/modules/auth'
import { profileRoutes } from '@/router/modules/profiles'
import { busiRoutes } from '@/router/modules/businesses'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/views/Home/index.vue'),
  },
  ...authRoutes,
  ...profileRoutes,
  ...busiRoutes,
]


export const router = createRouter({
  history: createWebHistory(''),
  routes,
  // scrollBehavior: (to, from, savedPosition) => {
  //   if (to.hash) {
  //     return { el: to.hash }
  //   } else if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { top: 0 }
  //   }
  // }
})
