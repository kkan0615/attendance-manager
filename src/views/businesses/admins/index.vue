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
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toCapitalize } from '@/utils/commons/stringUtil'

const i18n = useI18n()
const checkRole = useCheckRole()

/* Check role */
checkRole.checkRouteRole()

onMounted(() => {
  document.title = toCapitalize(i18n.t('Pages.Businesses.Admins.title'))
})
</script>
