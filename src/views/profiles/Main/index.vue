<template>
  <q-page
    padding
    class="tw-max-w-4xl tw-mx-auto tw-space-y-4"
  >
    <profile-main-profile />
    <q-card>
      <q-card-section
        class="q-pb-none"
      >
        <span
          class="text-h6"
        >
          Business list
        </span>
      </q-card-section>
      <q-list
        padding
        class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-4"
      >
        <profile-main-busi-item
          v-for="business in currentStore.CurrentUserBusiList"
          :key="business.id"
          :business="business"
        />
      </q-list>
    </q-card>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'ProfileMain',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import ProfileMainProfile from '@/views/profiles/Main/components/Profile.vue'
import ProfileMainBusiItem from '@/views/profiles/Main/components/BusiItem.vue'

const currentStore = useCurrentStore()

const initData = async () => {
  try {
    await currentStore.loadCurrentUserBusiList()
  } catch (e) {
    console.error(e)
  }
}

initData()
</script>
