<template>
  <q-drawer
    :model-value="busiSettingStore.IsLeftDrawerOpen"
    :width="256"
    :breakpoint="700"
    class="bg-primary text-white tw-rounded-r-2xl"
    @update:model-value="onUpdateModelValue"
  >
    <q-scroll-area
      class="fit"
    >
      <div class="q-pa-sm">
        <div
          v-for="n in 50"
          :key="n"
        >
          Drawer {{ n }} / 50
        </div>
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
  if (!busiSettingStore.IsLeftDrawerOpen !== bool)
    busiSettingStore.setLeftDrawer(bool)
}
</script>
