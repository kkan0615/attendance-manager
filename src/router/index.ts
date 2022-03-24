import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppLayout',
    component: () => import('@/views/apps/index.vue'),
    redirect: import.meta.env.MODE === 'production' ? undefined : { name: 'AppHome', params: { id: 'test' } },
    children: [
      {
        path: '/:id/home',
        name: 'AppHome',
        component: () => import('@/views/apps/Home/index.vue'),
      }
    ]
  },
]

export const router = createRouter({
  history: createWebHistory(''),
  routes,
})
