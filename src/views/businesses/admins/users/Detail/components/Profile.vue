<template>
  <q-card>
    <q-card-section
      class="profile-container"
    >
      <div
        class="left-card"
      >
        <div
          class="tw-text-center tw-relative"
        >
          <q-avatar
            :class="{
              'tw-ring-4': busiUserStore.BusiUserAdmin.status,
              'tw-ring-status-work': busiUserStore.BusiUserAdmin.status === 'work',
              'tw-ring-status-rest': busiUserStore.BusiUserAdmin.status === 'rest',
              'tw-ring-status-off': busiUserStore.BusiUserAdmin.status === 'off',
            }"
            size="250px"
          >
            <q-img
              v-if="busiUserStore.BusiUserAdmin.img"
              class="profile-image"
              fit="cover"
              :src="busiUserStore.BusiUserAdmin.img"
            />
            <span
              v-else
            >
              {{ busiUserStore.BusiUserAdmin.name[0] }}
            </span>
          </q-avatar>
          <busi-user-status-badge
            class="status-badge"
            :status="busiUserStore.BusiUserAdmin.status"
          />
        </div>
        <div
          v-if="busiUserStore.BusiUserAdmin.startWorkAt"
          class="text-center q-mt-md"
        >
          <work-timer
            :start-time="busiUserStore.BusiUserAdmin.startWorkAt"
          />
        </div>
      </div>
      <div
        class="right-card"
      >
        <!-- Name -->
        <div
          class="c-display-row-end"
        >
          <div
            class="c-display-row-end--label c-text-first-uppercase"
          >
            {{ $t('Types.Models.BusiUsers.name') }}
          </div>
          <div
            class="c-display-row-end--content c-text-first-uppercase"
          >
            {{ busiUserStore.BusiUserAdmin.name }}
          </div>
        </div>
        <!-- Email -->
        <div
          class="c-display-row-end"
        >
          <div
            class="c-display-row-end--label c-text-first-uppercase"
          >
            {{ $t('Types.Models.BusiUsers.email') }}
          </div>
          <div
            class="c-display-row-end--content c-text-first-uppercase"
          >
            {{ busiUserStore.BusiUserAdmin.email }}
          </div>
        </div>
        <!-- Auth -->
        <div
          class="c-display-row-end"
        >
          <div
            class="c-display-row-end--label c-text-first-uppercase"
          >
            {{ $t('Types.Models.BusiUsers.auth') }}
          </div>
          <div
            class="c-display-row-end--content c-text-first-uppercase"
          >
            {{ $t(`Types.Models.BusiUsers.UserAuths.${busiUserStore.BusiUserAdmin.auth}`) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserDetailProfile',
}
</script>
<script setup lang="ts">
import { useBusiUserStore } from '@/store/busiUser'
import WorkTimer from '@/components/WorkTimer.vue'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'

const busiUserStore = useBusiUserStore()

</script>
<style
  lang="scss"
  scoped
>
/* Left card max width */
$leftCardMaxWidth: 300px;

.profile-container {
  @apply md:tw-flex md:tw-space-x-2 tw-space-x-0 md:tw-space-y-0 tw-space-y-2 tw-h-full;

  .left-card {
    @apply tw-h-full tw-shrink;

    .status-badge {
      @apply tw-absolute tw-bottom-0;
      left: 75%;
    }
  }

  .right-card {
    @apply tw-grow tw-w-full tw-pl-4;
  }
}
</style>
