<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="User list"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex q-mb-md"
    >
      <div
        class="text-h6"
      >
        Total: {{ listCount }}
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
      </div>
    </div>
    <div
      v-if="listData && listData.length"
      class="tw-grid md:tw-grid-cols-4 tw-grid-cols-1 tw-gap-4"
    >
      <busi-app-user-list-user-card
        v-for="data in listData"
        :key="data.id"
        :user="data"
      />
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAppUserMain',
}
</script>
<script setup lang="ts">
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import { QBreadcrumbsElProps } from 'quasar'
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import { BusiUserStatus, userStatusSelectOption } from '@/types/models/users/business'
import BusiAppUserListUserCard from '@/views/businesses/apps/users/Main/components/UserCard.vue'

const busiUserStore = useBusiUserStore()
const currentStore = useCurrentStore()

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'App',
  },
  {
    label: 'User',
  },
  {
    label: 'Main'
  }
])
const statusOption = ref([{ label: 'All', value: 'all' }].concat(userStatusSelectOption))
const status = ref<BusiUserStatus | 'all'>('all')

const listData = computed(() => {
  let result = busiUserStore.BusiUserAppList
  if (status.value !== 'all') {
    result = busiUserStore.BusiUserAppList.filter(busiUser => busiUser.status === status.value)
  }

  return result
})

const listCount = computed(() => {
  let result = busiUserStore.BusiUserAppListCount
  if (status.value !== 'all') {
    result = listData.value.length
  }

  return result
})

const initData = async () => {
  try {
    await busiUserStore.loadBusiUserAppList({
      busiId: currentStore.CurrentBusiness.id,
    })
  } catch (e) {
    console.error(e)
  }
}

initData()

onBeforeUnmount(() => {
  busiUserStore.resetBusiUserAppList()
})
</script>
