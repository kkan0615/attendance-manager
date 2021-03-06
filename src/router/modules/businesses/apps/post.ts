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
      },
      {
        path: 'form/new',
        name: 'BusiAppPostCreateForm',
        component: () => import('@/views/businesses/apps/posts/Form/index.vue'),
        meta: { isBusi: true },
      },
      {
        path: 'form/id/:id',
        name: 'BusiAppPostUpdateForm',
        component: () => import('@/views/businesses/apps/posts/Form/index.vue'),
        meta: { isBusi: true },
      },
      {
        path: 'detail/id/:id',
        name: 'BusiAppPostDetail',
        component: () => import('@/views/businesses/apps/posts/Detail/index.vue'),
        meta: { isBusi: true },
      }
    ]
  },
]
