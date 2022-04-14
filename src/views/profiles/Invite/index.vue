<template>
  <q-page
    padding
    class="tw-max-w-4xl tw-mx-auto tw-space-y-4"
  >
    <q-card>
      <q-card-section>
        <div
          class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-4"
        >
          <profile-invite-busi-card
            v-for="invite in userInviteList"
            :key="invite.id"
            :invite="invite"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'ProfileInvite',
}
</script>
<script setup lang="ts">

import { useUserStore } from '@/store/user'
import { onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import ProfileInviteBusiCard from '@/views/profiles/Invite/components/BusiCard.vue'

const userStore = useUserStore()

const { userInviteList } = storeToRefs(userStore)

const initData = async () => {
  try {
    await userStore.loadUserInviteList()
  } catch (e) {
    console.error(e)
  }
}

initData()

onBeforeUnmount(() => {
  userStore.resetUserInviteList()
})
</script>
