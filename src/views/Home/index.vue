<template>
  <div>
    <div
      v-if="isUseDummy"
      class="text-h2 tw-h-screen tw-w-full tw-flex tw-justify-center tw-items-center"
    >
      Redirect to Demo page
    </div>
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
import { computed } from 'vue'

const router = useRouter()
const isUseDummy = computed(() => import.meta.env.VITE_IS_USE_DUMMY)

if (isUseDummy.value) {
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
