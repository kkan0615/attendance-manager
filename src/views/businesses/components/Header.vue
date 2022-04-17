<template>
  <q-header
    class="tw-flex tw-items-center tw-bg-white tw-text-black"
    bordered
    style="height: 48px;"
  >
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="menu"
        class="q-mr-sm"
        @click="onClickMenuBtn"
      />
      <q-avatar
        style="height: 38px; width: 38px;"
      >
        <q-img
          :src="currentStore.CurrentBusiness.smallLogo"
          fit="cover"
          height="80%"
          width="80%"
        />
      </q-avatar>
      <q-toolbar-title>
        {{ currentStore.CurrentBusiness.name }}
      </q-toolbar-title>
      <!-- Business list dropdown -->
      <busi-layout-busi-list-menu />
      <!-- Business list dropdown -->
      <busi-layout-notification-menu
        class="q-mr-sm"
      />
      <!-- User Menu -->
      <busi-layout-user-menu />
    </q-toolbar>
  </q-header>
</template>
<script lang="ts">
export default {
  name: 'BusiLayoutHeader',
}
</script>
<script setup lang="ts">
import { useBusiSettingStore } from '@/store/businessSetting'
import { useCurrentStore } from '@/store/current'
import BusiLayoutUserMenu from '@/views/businesses/components/UserMenu.vue'
import BusiLayoutBusiListMenu from '@/views/businesses/components/BusiListMenu.vue'
import BusiLayoutNotificationMenu from '@/views/businesses/components/NotificationMenu.vue'

const currentStore = useCurrentStore()
const busiSettingStore = useBusiSettingStore()

const onClickMenuBtn = () => {
  busiSettingStore.setLeftDrawer(!busiSettingStore.IsLeftDrawerOpen)
}
</script>
