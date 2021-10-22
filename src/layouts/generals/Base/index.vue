<template>
  <div
    class="tw-flex tw-h-full"
  >
    <sidebar-base-general-layout />
    <c-main-layout
      class="tw-flex-1"
    >
      <appbar-base-general-layout
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
import AppbarBaseGeneralLayout from '@/layouts/generals/Base/components/Appbar.vue'
import SidebarBaseGeneralLayout from '@/layouts/generals/Base/components/Sidebar.vue'
</script>
