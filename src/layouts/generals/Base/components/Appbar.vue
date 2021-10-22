<template>
  <c-appbar-layout>
    AppbarBaseGeneralLayout
    <div
      class="tw-ml-auto"
    >
      <c-material-icon>
        notifications
      </c-material-icon>
    </div>
  </c-appbar-layout>
</template>
<script
    lang="ts"
>
export default {
  name: 'AppbarBaseGeneralLayout',
}
</script>
<script setup lang="ts">
import CAppbarLayout from '@/components/commons/layouts/Appbar/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
</script>
