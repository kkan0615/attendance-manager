<template>
  <q-badge
    class="text-subtitle2 tw-px-1.5"
    :class="{
      'tw-bg-status-work': status === 'work',
      'tw-bg-status-rest': status === 'rest',
      'tw-bg-status-off': status === 'off',
    }"
  >
    <q-icon
      v-if="iconName"
      class="q-mr-sm"
      :name="iconName"
    />
    <span>
      {{ status }}
    </span>
  </q-badge>
</template>
<script lang="ts">
export default {
  name: 'BusiUserStatusBadge',
}
</script>
<script setup lang="ts">

import { computed, PropType } from 'vue'
import { BusiUserStatus } from '@/types/models/users/business'

const props = defineProps({
  status: {
    type: String as PropType<BusiUserStatus>,
    required: true,
    default: ''
  }
})

const iconName = computed(() => {
  let result = ''
  if (props.status === 'work') {
    result = 'directions_run'
  } else if (props.status === 'rest') {
    result = 'coffee'
  } else if (props.status === 'off') {
    result = 'work_off'
  }

  return result
})
</script>
