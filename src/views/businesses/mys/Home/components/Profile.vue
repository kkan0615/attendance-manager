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
        <!--      https://64.media.tumblr.com/1ad3de751061e49ae796d023844a3f6f/79f2fe531aa3cccf-26/s540x810/b29ec8ff707cadbe5de13889021694cf62a2af6b.png-->
        <q-img
          class="profile-image"
          fit="cover"
          src="https://64.media.tumblr.com/b5d68d4fb992a1ba0013b5dc412b0eaa/0d1853ff26639c9c-0b/s400x600/7a458c9896d9fecb13dcb5381b10ec34a97075ad.png"
        />
      </q-avatar>
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

const currentStore = useCurrentStore()

</script>
<style
  lang="scss"
  scoped
>
.profile-image-container {
  @apply tw-text-center;
}

.profile-image {
  @apply tw-h-full tw-w-full;
}
</style>
