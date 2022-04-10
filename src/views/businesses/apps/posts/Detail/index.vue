<template>
  <q-page
    padding
  >
    BusiAppNotificationDetail
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationDetail',
}
</script>
<script setup lang="ts">
import { useBusiPostStore } from '@/store/busiPost'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'

const route = useRoute()
const router = useRouter()
const busiPostStore = useBusiPostStore()

const initData = async () => {
  try {
    const { id } = route.params
    busiPostStore.loadBusiPost(Number(id))
  } catch (e) {
    console.error()
  }
}

initData()

onBeforeUnmount(() => {
  busiPostStore.resetBusiPost()
})
</script>
