<template>
  <q-header
    bordered
  >
    <q-toolbar
      style="height: 48px;"
      class="tw-max-w-4xl tw-mx-auto tw-flex tw-items-center q-px-md"
    >
      <comp-logo />
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
        :name="$t('Pages.Profiles.Homes.title')"
        :label="$t('Pages.Profiles.Homes.title')"
      />
      <q-route-tab
        :to="{ name: 'ProfileInvite' }"
        :name="$t('Pages.Profiles.Invites.title')"
        :label="$t('Pages.Profiles.Invites.title')"
      />
      <q-route-tab
        :to="{ name: 'ProfileAnalysis' }"
        :name="$t('Pages.Profiles.Analysis.title')"
        :label="$t('Pages.Profiles.Analysis.title')"
      />
    </q-tabs>
  </q-header>
</template>
<script lang="ts">
export default {
  name: 'ProfileLayoutHeader',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import ProfileLayoutNotificationMenu from '@/views/profiles/components/NotificationMenu.vue'
import ProfileLayoutUserMenu from '@/views/profiles/components/UserMenu.vue'
import CompLogo from '@/components/Logo.vue'
</script>
