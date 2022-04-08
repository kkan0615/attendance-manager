<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="Post"
      :breadcrumbs="breadcrumbs"
    />
    BusiAppNotificationMain
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationMain',
}
</script>
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { useBusiPostStore } from '@/store/busiPost'

const busiPostStore = useBusiPostStore()

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'App',
  },
  {
    label: 'Post',
  },
  {
    label: 'Main'
  }
])

const initData = async () => {
  try {
    await busiPostStore.loadBusiPostList({})
  } catch (e) {
    console.error(e)
  }
}

initData()

onBeforeUnmount(() => {
  busiPostStore.resetBusiPostList()
})
</script>
