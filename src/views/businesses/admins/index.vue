<template>
  <router-view />
</template>
<script lang="ts">
export default {
  name: 'BusiAdminLayout',
}
</script>
<script setup lang="ts">
import { useCheckRole } from '@/plugins/useCheckRole'

const checkRole = useCheckRole()

/* Check role */
checkRole.checkRouteRole()
</script>
