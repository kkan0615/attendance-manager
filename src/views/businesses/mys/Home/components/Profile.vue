<template>
  <!-- Image -->
  <div
    class="tw-text-center"
  >
    <div class="profile-image-container">
      <q-avatar
        :class="{
          'tw-ring-4': currentStore.CurrentBusiUser.status,
          'tw-ring-status-work': currentStore.CurrentBusiUser.status === 'work',
          'tw-ring-status-rest': currentStore.CurrentBusiUser.status === 'rest',
          'tw-ring-status-off': currentStore.CurrentBusiUser.status === 'off',
        }"
        size="250px"
      >
        <q-img
          v-if="currentStore.CurrentBusiUser.img"
          class="profile-image"
          fit="cover"
          :src="currentStore.CurrentBusiUser.img"
        />
        <span
          v-else
        >
          {{ currentStore.CurrentBusiUser.name[0] }}
        </span>
      </q-avatar>
      <busi-user-status-badge
        class="status-badge"
        :status="currentStore.CurrentBusiUser.status"
      />
    </div>
    <div
      class="tw-mt-2"
    >
      <div
        class="text-h6"
      >
        {{ currentStore.CurrentBusiUser.nickname }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeProfile',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'

const currentStore = useCurrentStore()

</script>
<style
  lang="scss"
  scoped
>
.profile-image-container {
  @apply tw-text-center tw-relative;

  .status-badge {
    @apply tw-absolute tw-bottom-0;
    left: 65%;
  }
}

.profile-image {
  @apply tw-h-full tw-w-full;
}
</style>
