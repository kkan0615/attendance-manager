<template>
  <div>
    <div
      class="tw-text-lg tw-text-gray-500 hover:tw-text-white tw-p-2 tw-px-4 hover:tw-bg-gray-700 rounded tw-cursor-pointer"
    >
      {{ label }}
    </div>
    <ul
      class="tw-pl-4"
    >
      <slot />
    </ul>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CSidebarLayoutMenuGroup',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  }
})
</script>
