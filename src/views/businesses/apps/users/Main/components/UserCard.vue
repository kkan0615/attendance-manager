<template>
  <q-card>
    <div
      class="image-container q-mt-md cursor-pointer"
    >
      <q-avatar
        color="secondary"
        :class="{
          'tw-ring-4': user.status,
          'tw-ring-status-work': user.status === 'work',
          'tw-ring-status-rest': user.status === 'rest',
          'tw-ring-status-off': user.status === 'off',
        }"
        size="120px"
      >
        <q-img
          v-if="user.img"
          class="profile-image"
          fit="cover"
          :src="user.img"
        />
        <span
          v-else
        >
          {{ user.name[0] }}
        </span>
      </q-avatar>
      <busi-user-status-badge
        class="status-badge"
        :status="user.status"
      />
    </div>
    <q-card-section>
      <div
        class="text-center q-mb-sm"
        style="min-height: 32px;"
      >
        <work-timer
          v-if="user.startWorkAt"
          :start-time="user.startWorkAt"
        />
      </div>
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
          {{ user.name }}
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
          {{ user.email }}
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
          {{ $t(`Types.Models.BusiUsers.UserAuths.${user.auth}`) }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiAppUserListUserCard',
}
</script>
<script setup lang="ts">
import { PropType } from 'vue'
import { BusiUserAdminListInfo } from '@/types/models/users/business'
import { useI18n } from 'vue-i18n'
import WorkTimer from '@/components/WorkTimer.vue'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'

const i18n = useI18n()

const props = defineProps({
  user: {
    type: Object as PropType<BusiUserAdminListInfo>,
    required: true,
    default: () => {},
  }
})

</script>
<style
    lang="scss"
    scoped
>
.image-container {
  @apply tw-text-center tw-relative;

  .status-badge {
    @apply tw-absolute tw-bottom-0;
    left: 60%;
  }
}
</style>
