import { RouteRecordRaw } from 'vue-router'

export const busiAppPostRoutes: RouteRecordRaw[] = [
  {
    path: 'post',
    name: 'BusiAppPostLayout',
    component: () => import('@/views/businesses/apps/posts/index.vue'),
    redirect: { name: 'BusiAppPostMain' },
    meta: { isBusi: true },
    children: [
      {
        path: '',
        name: 'BusiAppPostMain',
        component: () => import('@/views/businesses/apps/posts/Main/index.vue'),
        meta: { isBusi: true },
      }
    ]
  },
]
