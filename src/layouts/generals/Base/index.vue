<template>
  <div
    class="tw-flex tw-h-full"
  >
    <div
      class="tw-border-r tw-border-black tw-rounded-r-lg tw-w-56 tw-h-full tw-bg-general-sidebar tw-text-white"
    >
      sidebar
    </div>
    <div
      class="tw-h-full"
    >
      <router-view />
    </div>
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
</script>
