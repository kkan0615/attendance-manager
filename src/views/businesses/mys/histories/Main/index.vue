<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="History main"
      :breadcrumbs="breadcrumbs"
    />
    History main
    {{ $route.matched.map(match =>match.name) }}
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiHistoryMain',
}
</script>
<script setup lang="ts">
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'My Home',
    to: { name: 'BusiMyHome' }
  },
  {
    label: 'History',
  },
  {
    label: 'main'
  }
])
</script>
