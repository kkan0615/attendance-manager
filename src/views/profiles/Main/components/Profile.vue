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
            class="tw-ring tw-ring-q-primary"
            size="250px"
          >
            <q-img
              v-if="currentStore.CurrentUser.img"
              class="profile-image"
              fit="cover"
              :src="currentStore.CurrentUser.img"
            />
            <span
              v-else
            >
              {{ currentStore.CurrentUser.name[0] }}
            </span>
          </q-avatar>
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
            {{ $t('Types.Models.Users.name') }}
          </div>
          <div
            class="c-display-row-end--content c-text-first-uppercase"
          >
            {{ currentStore.CurrentUser.name }}
          </div>
        </div>
        <!-- Email -->
        <div
          class="c-display-row-end"
        >
          <div
            class="c-display-row-end--label c-text-first-uppercase"
          >
            {{ $t('Types.Models.Users.email') }}
          </div>
          <div
            class="c-display-row-end--content c-text-first-uppercase"
          >
            {{ currentStore.CurrentUser.email }}
          </div>
        </div>
        <!-- Nickname -->
        <div
          class="c-display-row-end"
        >
          <div
            class="c-display-row-end--label c-text-first-uppercase"
          >
            {{ $t('Types.Models.Users.nickname') }}
          </div>
          <div
            class="c-display-row-end--content c-text-first-uppercase"
          >
            {{ currentStore.CurrentUser.nickname }}
          </div>
        </div>
        <!-- Description -->
        <div
          class="c-display-row-end"
        >
          <div
            class="c-display-row-end--label c-text-first-uppercase"
          >
            {{ $t('Types.Models.Users.description') }}
          </div>
          <div
            class="c-display-row-end--content tw-whitespace-pre-wrap"
          >
            {{ currentStore.CurrentUser.description }}
          </div>
        </div>
        <!-- Created at (join date) -->
        <div
          class="c-display-row-end"
        >
          <div
            class="c-display-row-end--label c-text-first-uppercase"
          >
            {{ $t('Types.Models.Users.createdAt') }}
          </div>
          <div
            class="c-display-row-end--content c-text-first-uppercase"
          >
            {{ formattedCreatedAt }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'ProfileMainProfile',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { computed } from 'vue'
import dayjs from 'dayjs'

const currentStore = useCurrentStore()

const formattedCreatedAt = computed(() => dayjs(currentStore.CurrentUser.createdAt).format('ll'))
</script>
<style
    lang="scss"
    scoped
>
.profile-container {
  @apply md:tw-flex md:tw-space-x-2 tw-space-x-0 md:tw-space-y-0 tw-space-y-2 tw-h-full;

  .left-card {
    @apply tw-h-full tw-shrink;
  }

  .right-card {
    @apply tw-grow tw-w-full lg:tw-pl-4;
  }
}
</style>
