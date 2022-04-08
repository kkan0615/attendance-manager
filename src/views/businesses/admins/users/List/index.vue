<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="Admin User list"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex q-mb-md"
    >
      <div
        class="text-h6 c-text-first-uppercase"
      >
        {{ $t('Commons.Titles.total') }}: {{ listCount }}
      </div>
      <div
        class="tw-ml-auto tw-flex tw-space-x-2"
      >
        <q-select
          v-model="status"
          dense
          outlined
          hide-bottom-space
          option-value="value"
          :options="statusOption"
          option-label="label"
          emit-value
        />
        <div>
          <q-btn
            color="primary"
            label="invite"
            @click="onClickInviteBtn"
          />
        </div>
      </div>
    </div>
    <div
      v-if="listData && listData.length"
      class="tw-grid md:tw-grid-cols-4 tw-grid-cols-1 tw-gap-4"
    >
      <busi-admin-user-list-user-card
        v-for="data in listData"
        :key="data.id"
        :user="data"
      />
    </div>
    <busi-admin-user-list-invite-modal
      v-model="isInviteModalOpen"
    />
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserList',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import { BusiUserStatus, userStatusSelectOption } from '@/types/models/users/business'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import BusiAdminUserListUserCard from '@/views/businesses/admins/users/List/components/UserCard.vue'
import BusiAdminUserListInviteModal from '@/views/businesses/admins/users/List/components/InviteModal.vue'

const busiUserStore = useBusiUserStore()
const currentStore = useCurrentStore()

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'Admin',
  },
  {
    label: 'User',
  },
  {
    label: 'List'
  }
])
const statusOption = ref([{ label: 'All', value: 'all' }].concat(userStatusSelectOption))
const status = ref<BusiUserStatus | 'all'>('all')
const isInviteModalOpen = ref(false)

const listData = computed(() => {
  let result = busiUserStore.BusiUserAdminList
  if (status.value !== 'all') {
    result = busiUserStore.BusiUserAdminList.filter(busiUser => busiUser.status === status.value)
  }

  return result
})

const listCount = computed(() => {
  let result = busiUserStore.BusiUserAdminListCount
  if (status.value !== 'all') {
    result = listData.value.length
  }

  return result
})

const onClickInviteBtn = async () => {
  try {
    await busiUserStore.loadBusiUserInviteList(currentStore.CurrentBusiness.id)
    isInviteModalOpen.value = true
  } catch (e) {
    console.error(e)
  }
}

const initData = async () => {
  try {
    await busiUserStore.loadBusiUserAdminList({
      busiId: currentStore.CurrentBusiness.id,
    })
  } catch (e) {
    console.error(e)
  }
}

initData()
</script>
