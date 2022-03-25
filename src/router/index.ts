import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/business',
    name: 'BusinessLayout',
    component: () => import('@/views/businesses/index.vue'),
    redirect: import.meta.env.MODE === 'production' ? undefined : { name: 'BusinessHome', params: { id: 'test' } },
    children: [
      {
        path: ':id/home',
        name: 'BusinessHome',
        component: () => import('@/views/businesses/Home/index.vue'),
      }
    ]
  },
]

export const router = createRouter({
  history: createWebHistory(''),
  routes,
})
