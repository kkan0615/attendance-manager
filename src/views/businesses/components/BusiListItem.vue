<template>
  <div
    class="text-center hover:tw-bg-gray-100"
    :class="{
      'tw-border': isActive,
      'tw-border-dotted': isActive,
      'tw-border-q-primary': isActive,
    }"
  >
    <router-link :to="{ name: 'BusiMyLayout', params: { busiId: business.id } }">
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
    </router-link>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BusiLayoutBusiListItem',
}
</script>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import { BusinessSimpleListInfo } from '@/types/models/businesses'
import { useCurrentStore } from '@/store/current'
import { storeToRefs } from 'pinia'

const currentStore = useCurrentStore()

const props = defineProps({
  business: {
    type: Object as PropType<BusinessSimpleListInfo>,
    required: true,
    default: () => {}
  }
})

const { currentBusiness } = storeToRefs(currentStore)

/* If the current business and business id is same, it's active state */
const isActive = computed(() => props.business && props.business.id === currentBusiness.value.id)
</script>
