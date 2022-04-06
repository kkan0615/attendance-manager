import { RouteRecordRaw } from 'vue-router'

export const profileRoutes: RouteRecordRaw[] = [
  {
    path: '/profile/:id',
    name: 'ProfileLayout',
    component: () => import('@/views/profiles/index.vue'),
    redirect: { name: 'ProfileMain' },
    meta: { requiredLogin: true },
    children: [
      {
        path: '',
        name: 'ProfileMain',
        component: () => import('@/views/profiles/Main/index.vue'),
        meta: { isRequiredLogin: true },
      }
    ]
  },
]
