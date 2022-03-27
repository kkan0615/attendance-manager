<template>
  <q-page
    padding
  >
    <div
      class="home-content"
    >
      <q-card
        class="left-card"
      >
        <q-card-section
          class="tw-h-full"
        >
          <!-- Image -->
          <business-home-profile />
          <div
            class="tw-mt-2 tw-space-y-3"
          >
            <!-- On the job -->
            <business-home-work-btn />
            <!-- status -->
            <business-home-status-select />
          </div>
        </q-card-section>
      </q-card>
      <q-card
        class="right-card"
      >
        <q-card-section>
          right
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusinessHome',
}
</script>
<script setup lang="ts">
import BusinessHomeWorkBtn from '@/views/businesses/mys/Home/components/WorkBtn.vue'
import BusinessHomeStatusSelect from '@/views/businesses/mys/Home/components/StatusSelect.vue'
import BusinessHomeProfile from '@/views/businesses/mys/Home/components/Profile.vue'
</script>
<style
  lang="scss"
  scoped
>
/* Left card max width */
$leftCardMaxWidth: 400px;

.home-content {
  @apply md:tw-flex md:tw-space-x-2 tw-space-x-0 md:tw-space-y-0 tw-space-y-2 tw-h-full;

  .left-card {
    @apply lg:tw-w-full lg:tw-max-w-sm tw-h-full;
  }

  .right-card {
    @apply tw-grow;
  }
}
</style>
