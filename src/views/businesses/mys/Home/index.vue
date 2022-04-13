<template>
  <q-page
    padding
  >
    <div
      class="home-content"
    >
      <div class="left-card tw-space-y-3">
        <q-card>
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
        <!-- Total Work time -->
        <business-home-total-work-time
          v-if="!totalWorkTimeLoading"
        />
      </div>
      <!-- right part -->
      <div class="right-card">
        <business-home-notification-post-list />
        <!-- Work history -->
        <business-home-work-history />
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusinessHome',
}
</script>
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useCurrentStore } from '@/store/current'
import BusinessHomeWorkBtn from '@/views/businesses/mys/Home/components/WorkBtn.vue'
import BusinessHomeStatusSelect from '@/views/businesses/mys/Home/components/StatusSelect.vue'
import BusinessHomeProfile from '@/views/businesses/mys/Home/components/Profile.vue'
import BusinessHomeWorkHistory from '@/views/businesses/mys/Home/components/WorkHistory.vue'
import BusinessHomeTotalWorkTime from '@/views/businesses/mys/Home/components/TotalWorkTime.vue'
import BusinessHomeNotificationPostList from '@/views/businesses/mys/Home/components/NotificationPostList.vue'

const currentStore = useCurrentStore()

const totalWorkTimeLoading = ref(false)

const initData = async () => {
  try {
    totalWorkTimeLoading.value = true
    await currentStore.loadCurrentBusiUserWorkHistoryList()
    await currentStore.loadCurrentBusiUserTotalWorkSeconds()
    totalWorkTimeLoading.value = false
  } catch (e) {
    console.error(e)
  }
}

initData()

onBeforeUnmount(async () => {
  await currentStore.resetCurrentBusiUserWorkHistoryList()
})
</script>
<style
  lang="scss"
  scoped
>
/* Left card max width */
$leftCardMaxWidth: 400px;

.home-content {
  @apply md:tw-flex md:tw-space-x-4 tw-space-x-0 md:tw-space-y-0 tw-space-y-2 tw-h-full;

  .left-card {
    @apply lg:tw-w-full lg:tw-max-w-sm tw-h-full;
  }

  .right-card {
    @apply tw-grow tw-w-full tw-space-y-4;
  }
}
</style>
