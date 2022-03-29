<template>
  <q-drawer
    :model-value="busiSettingStore.IsLeftDrawerOpen"
    :width="250"
    show-if-above
    class="tw-bg-sidenav-dark tw-text-white"
    @update:model-value="onUpdateModelValue"
  >
    <q-scroll-area
      class="fit"
    >
      <div class="q-pa-sm">
        <!--    My menu list    -->
        <div
          class="text-subtitle2 text-grey-4"
        >
          My
        </div>
        <q-list
          padding
        >
          <q-item
            :to="{ name: 'BusiMyHome' }"
            clickable
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>
          <q-item
            clickable
            :to="{ name: 'BusiMyScheduleLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="schedule" />
            </q-item-section>
            <q-item-section>Schedule</q-item-section>
          </q-item>
          <q-item
            clickable
            :to="{ name: 'BusiMyHistoryLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>
            <q-item-section>History</q-item-section>
          </q-item>
        </q-list>
        <!--    App menu list    -->
        <div
          class="text-subtitle2 text-grey-4"
        >
          App
        </div>
        <q-list
          padding
        >
          <q-item
            clickable
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>User</q-item-section>
          </q-item>
          <q-item
            clickable
          >
            <q-item-section avatar>
              <q-icon name="schedule" />
            </q-item-section>
            <q-item-section>Schedule</q-item-section>
          </q-item>
        </q-list>
        <!--    App menu list    -->
        <div
          class="text-subtitle2 text-grey-4"
        >
          Admin
        </div>
        <q-list
          padding
        >
          <q-item
            clickable
            :to="{ name: 'BusiAdminQRCodeLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="qr_code_scanner" />
            </q-item-section>
            <q-item-section>QR code Scanner</q-item-section>
          </q-item>
          <q-item
            clickable
          >
            <q-item-section avatar>
              <q-icon name="business" />
            </q-item-section>
            <q-item-section>business</q-item-section>
          </q-item>
          <q-item
            clickable
            :to="{ name: 'BusiAdminUserLayout' }"
            active-class="active-router"
          >
            <q-item-section avatar>
              <q-icon name="people_alt" />
            </q-item-section>
            <q-item-section>User</q-item-section>
          </q-item>
          <q-item
            clickable
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>Settings</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>
<script lang="ts">
export default {
  name: 'BusiLayoutLeftDrawer',
}
</script>
<script setup lang="ts">
import { useBusiSettingStore } from '@/store/businessSetting'

const busiSettingStore = useBusiSettingStore()

const onUpdateModelValue = (bool: boolean) => {
  busiSettingStore.setLeftDrawer(bool)
}
</script>
<style
  lang="scss"
  scoped
>
/*
   active router
 */
.active-router {
  @apply tw-bg-q-primary tw-rounded-r-full tw-mr-2;
}

.q-item {
  min-height: 40px;
}
</style>
