<template>
  <div
    class="tw-flex tw-h-full"
  >
    <base-general-layout-sidebar />
    <c-main-layout
      class="tw-flex-1"
    >
      <base-general-layout-appbar
        class="mb-2"
      />
      <router-view />
    </c-main-layout>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'GeneralBaseLayout',
}
</script>
<script setup lang="ts">
import CMainLayout from '@/components/commons/layouts/Main/index.vue'
import BaseGeneralLayoutSidebar from '@/layouts/generals/Base/components/Sidebar.vue'
import BaseGeneralLayoutAppbar from '@/layouts/generals/Base/components/Appbar.vue'
</script>
