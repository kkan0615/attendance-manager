<template>
  <q-item
    :to="{ name: 'BusiMyLayout', params: { busiId: business.id } }"
  >
    <q-item-section avatar>
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
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ business.name }}
      </q-item-label>
      <q-item-label caption>
        {{ business.description }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
export default {
  name: 'ProfileMainBusiItem',
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
