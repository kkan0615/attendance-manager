<template>
  <q-layout>
    <!-- @TODO: Change to component -->
    <q-header
      bordered
    >
      <q-toolbar
        style="height: 48px;"
        class="tw-max-w-4xl tw-mx-auto tw-flex tw-items-center q-px-md"
      >
        <div>
          @TODO: Logo will be here
        </div>
        <profile-layout-notification-menu
          class="tw-ml-auto q-mr-sm"
        />
        <profile-layout-user-menu />
      </q-toolbar>
      <!-- Route tabs -->
      <q-tabs
        class="tw-max-w-4xl tw-mx-auto"
        dense
        align="left"
      >
        <q-route-tab
          :to="{ name: 'ProfileMain' }"
          name="Home"
          label="Home"
        />
        <q-route-tab
          :to="{ name: 'ProfileInvite' }"
          name="invites"
          label="invites"
        />
      </q-tabs>
    </q-header>
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
import ProfileLayoutUserMenu from '@/views/profiles/components/UserMenu.vue'
import ProfileLayoutNotificationMenu from '@/views/profiles/components/NotificationMenu.vue'

const route = useRoute()
const router = useRouter()
const i18n = useI18n()
const currentStore = useCurrentStore()

// @TODO: Add check user id logic
const checkPageValidation = async () => {
  const { id } = route.params
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
