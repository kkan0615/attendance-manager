<template>
  <q-page
    padding
    class="tw-max-w-4xl tw-mx-auto tw-space-y-4"
  >
    <div
      v-if="userInviteList.length"
      class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-4"
    >
      <profile-invite-busi-card
        v-for="invite in userInviteList"
        :key="invite.id"
        :invite="invite"
      />
    </div>
    <q-card
      v-else
      class="text-h5 tw-h-72 tw-flex tw-justify-center tw-items-center"
    >
      <q-card-section>
        {{ $t('Commons.Placeholders.noData') }}
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
import { computed, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ProfileInviteBusiCard from '@/views/profiles/Invite/components/BusiCard.vue'

const userStore = useUserStore()

const { userInviteList } = storeToRefs(userStore)
const searchStr = ref('')

const listRows = computed(() => {
  let result = userInviteList.value

  if (searchStr.value) {
    result = userInviteList.value.filter(invite => invite.business.name.includes(searchStr.value))
  }

  return result
})

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
