<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
export default {
  name: 'ProfileLayout',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { useRoute, useRouter } from 'vue-router'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const i18n = useI18n()
const currentStore = useCurrentStore()

// @TODO: Add check user id logic
const checkPageValidation = async () => {
  const { id } = route.params
  console.log(id)
  if (!currentStore.CurrentUser
      || !currentStore.CurrentUser.id
      || !currentStore.CurrentUser.id
      || !Number(id)
      || Number(id) !== currentStore.CurrentUser.id
  ) {
    showSnackbar({
      message: i18n.t('Commons.Messages.unAuthUser'),
      color: 'negative'
    })

    /* Redirect to logout page */
    await router.push({ name: 'AuthLogout' })
  }
}

checkPageValidation()
</script>
