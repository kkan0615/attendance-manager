<template>
  <q-btn
    flat
    padding="0"
    dense
  >
    <q-item
      class="q-px-sm"
    >
      <q-item-section
        class="q-pr-sm tw-min-w-0 tw-shrink"
        avatar
      >
        <q-avatar
          size="32px"
        >
          <q-img
            v-if="currentStore.CurrentUser.img"
            :src="currentStore.CurrentUser.img"
            fit="cover"
            height="100%"
            width="100%"
          />
          <span
            v-else
          >
            <!--            {{ currentStore.CurrentUser.name[0] }}-->
            <q-icon
              size="sm"
              name="person"
            />
          </span>
        </q-avatar>
      </q-item-section>
      <q-item-section
        class="tw-w-full"
      >
        <q-item-label
          class="tw-normal-case tw-text-md"
          :class="{
            'tw-text-sm': currentStore.CurrentUser.name && currentStore.CurrentUser.name.length >= 10,
            'tw-text-xs': currentStore.CurrentUser.name && currentStore.CurrentUser.name.length >= 15,
          }"
        >
          {{ currentStore.CurrentUser.name }}
        </q-item-label>
      </q-item-section>
      <q-item-section
        class="tw-pl-2 tw-min-w-0 side-item"
        side
      >
        <q-icon
          size="sm"
          color="white"
          name="arrow_drop_down"
        />
      </q-item-section>
    </q-item>
    <q-menu>
      <q-list style="min-width: 150px">
        <q-separator />
        <q-item
          v-close-popup
          clickable
          :to="{ name: 'AuthLogout' }"
        >
          <q-item-section
            avatar
            class="tw-min-w-0"
          >
            <q-icon
              name="logout"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Logout
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script lang="ts">
export default {
  name: 'ProfileLayoutUserMenu',
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
.side-item {
  @apply tw-pl-2;
}
</style>
