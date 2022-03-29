<template>
  <router-view />
</template>
<script lang="ts">
export default {
  name: 'BusiAdminLayout',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { useRouter } from 'vue-router'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const i18n = useI18n()
const currentStore = useCurrentStore()

/* Check auth user */
if (!currentStore.CurrentBusiUser
    || !currentStore.CurrentBusiUser.id
    || (currentStore.CurrentBusiUser.auth === 'user'
    || currentStore.CurrentBusiUser.auth === 'staff')
) {
  showSnackbar({
    message: i18n.t('commons.messages.UnAuthUser'),
    color: 'negative'
  })
  router.push({ name: 'BusiMyLayout' })
}
</script>
