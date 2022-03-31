<template>
  <div>
    Home
  </div>
</template>
<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showSnackbar } from '@/utils/libs/quasar/notify'

const router = useRouter()

if (import.meta.env.VITE_IS_USE_DUMMY) {
  showSnackbar({
    message: 'Arrive to demo page',
    color: 'info'
  })
  router.push({
    name: 'BusiMyLayout',
    params: { busiId: 1 }
  })
}
</script>
