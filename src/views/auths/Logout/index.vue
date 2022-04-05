<template>
  <div>
    Logout...
  </div>
</template>
<script lang="ts">
export default {
  name: 'AuthLogout',
}
</script>
<script setup lang="ts">

import { useCurrentStore } from '@/store/current'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStore = useCurrentStore()

const logout = () => {
  currentStore.logout()
  router.push({ name: 'AuthLogin' })
}

logout()
</script>
