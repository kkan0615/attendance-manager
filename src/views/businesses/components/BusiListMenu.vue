<template>
  <q-btn
    flat
    round
    dense
    icon="view_module"
  >
    <q-menu>
      <q-card
        class="scroll-y"
        style="width: 350px; max-height: 400px;"
      >
        <q-card-section>
          <div
            class="tw-grid tw-grid-cols-3"
          >
            <busi-layout-busi-list-item
              v-for="business in currentStore.CurrentUserBusiList"
              :key="business.id"
              :business="business"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>
<script lang="ts">
export default {
  name: 'BusiLayoutBusiListMenu',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { onBeforeUnmount } from 'vue'
import BusiLayoutBusiListItem from '@/views/businesses/components/BusiListItem.vue'

const currentStore = useCurrentStore()

currentStore.loadCurrentUserBusiList()

onBeforeUnmount(() => {
  currentStore.resetCurrentUserBusiList()
})
</script>
