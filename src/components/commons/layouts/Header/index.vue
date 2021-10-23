<template>
  <div
    class="tw-flex"
  >
    <div
      class="tw-font-bold"
    >
      {{ title }}
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CHeaderLayout',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
})
</script>
