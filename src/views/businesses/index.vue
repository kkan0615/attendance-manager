<template>
  <q-layout
    view="lHh Lpr lFf"
    class="shadow-2 rounded-borders"
  >
    <!--  header  -->
    <busi-layout-header />
    <!--  left drawer  -->
    <busi-layout-left-drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
export default {
  name: 'BusinessHome',
}
</script>
<script setup lang="ts">
import BusiLayoutHeader from '@/views/businesses/components/Header.vue'
import BusiLayoutLeftDrawer from '@/views/businesses/components/LeftDrawer.vue'
import { useCurrentStore } from '@/store/current'
import { onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import { useBusiSettingStore } from '@/store/businessSetting'

const currentStore = useCurrentStore()
const busiSettingStore = useBusiSettingStore()
const $q = useQuasar()

if (!$q.platform.is.desktop) {
  busiSettingStore.setLeftDrawer(false)
}

onBeforeUnmount(() => {
  currentStore.resetCurrentBusiness()
  currentStore.resetCurrentBusiUser()
})

</script>
