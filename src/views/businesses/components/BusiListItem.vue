<template>
  <div
    class="text-center tw-gap-2"
  >
    <q-avatar
      size="48px"
    >
      <q-img
        :src="business.smallLogo"
        fit="cover"
        height="80%"
        width="80%"
      />
    </q-avatar>
    <div
      class="tw-truncate tw-text-xs"
    >
      {{ business.name }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BusiLayoutBusiListItem',
}
</script>
<script setup lang="ts">
import { PropType } from 'vue'
import { BusinessSimpleListInfo } from '@/types/models/businesses'

const props = defineProps({
  business: {
    type: Object as PropType<BusinessSimpleListInfo>,
    required: true,
    default: () => {}
  }
})
</script>
