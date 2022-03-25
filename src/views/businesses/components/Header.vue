<template>
  <q-header
    class="tw-flex tw-items-center bg-grey-2 text-black"
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
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg">
      </q-avatar>

      <q-toolbar-title>Busi name</q-toolbar-title>
      <!--   Business list dropdown   -->
      <q-btn
        flat
        round
        dense
        icon="view_module"
      >
        <q-tooltip>
          ##Business list
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        round
        dense
        icon="whatshot"
      />
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

const busiSettingStore = useBusiSettingStore()

const onClickMenuBtn = () => {
  busiSettingStore.setLeftDrawer(!busiSettingStore.IsLeftDrawerOpen)
}
</script>
