<template>
  <c-reload-prompt />
  <router-view />
</template>
<script lang="ts">
export default {
  name: 'App',
}
</script>
<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
import CReloadPrompt from '@/components/ReloadPrompt.vue'

const settingStore = useSettingStore()

/* Init all settings about app */
settingStore.initSetting()
</script>
<style
  lang="scss"
>
body {
  margin: 0;
}
</style>
