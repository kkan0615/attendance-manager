<template>
  <q-layout
    view="lHh lpr lFf"
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
import BusiLayoutBusiMiniDrawer from '@/views/businesses/components/BusiMiniDrawer.vue'
</script>
