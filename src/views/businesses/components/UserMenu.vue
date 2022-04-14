<template>
  <q-btn
    round
    padding="0"
  >
    <q-avatar
      size="32px"
    >
      <q-img
        v-if="currentStore.CurrentBusiUser.img"
        :src="currentStore.CurrentBusiUser.img"
        fit="cover"
        height="100%"
        width="100%"
      />
      <span>
        {{ currentStore.CurrentBusiUser.name ? currentStore.CurrentBusiUser.name[0] : '' }}
      </span>
    </q-avatar>
    <q-menu>
      <q-list style="min-width: 100px">
        <!-- User page -->
        <q-item
          v-close-popup
          clickable
          :to="{ name: 'ProfileLayout', params: { id: currentStore.CurrentBusiUser.userId } }"
        >
          <q-item-section
            avatar
            class="tw-min-w-0"
          >
            <q-icon
              name="person"
            />
          </q-item-section>
          <q-item-section>
            User
          </q-item-section>
        </q-item>
        <q-separator />
        <!-- Business User page -->
        <q-item
          v-close-popup
          clickable
          :to="{ name: 'BusiMyForm' }"
        >
          <q-item-section
            avatar
            class="tw-min-w-0"
          >
            <q-icon
              name="people"
            />
          </q-item-section>
          <q-item-section>
            Profile
          </q-item-section>
        </q-item>
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
  name: 'BusiLayoutUserMenu',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'

const currentStore = useCurrentStore()
</script>
