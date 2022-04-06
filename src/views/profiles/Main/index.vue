<template>
  <q-page
    padding
    class="tw-max-w-4xl tw-mx-auto tw-space-y-4"
  >
    <div
      class="text-right"
    >
      <q-btn
        color="primary"
        :label="$t('Commons.Buttons.edit')"
        @click="onClickEditBtn"
      />
    </div>
    <profile-main-profile />
    <q-card>
      <q-card-section
        class="q-pb-none"
      >
        <span
          class="text-h6"
        >
          Business list
        </span>
      </q-card-section>
      <q-card-section
        class="tw-flex q-py-sm"
      >
        <q-input
          v-model="searchStr"
          class="tw-max-w-xs tw-ml-auto"
          outlined
          dense
          placeholder="search"
        />
      </q-card-section>
      <q-list
        padding
        class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-4"
      >
        <profile-main-busi-item
          v-for="business in listRows"
          :key="business.id"
          :business="business"
        />
      </q-list>
    </q-card>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'ProfileMain',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import ProfileMainProfile from '@/views/profiles/Main/components/Profile.vue'
import ProfileMainBusiItem from '@/views/profiles/Main/components/BusiItem.vue'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const router = useRouter()
const currentStore = useCurrentStore()

const searchStr = ref('')
const listRows = computed(() => {
  let result = currentStore.CurrentUserBusiList
  if (searchStr.value) {
    result = result.filter(data =>
      data.name.toLowerCase().includes(searchStr.value.toLowerCase())
        || (data.description && data.description.toLowerCase().includes(searchStr.value.toLowerCase())
        )
    )
  }

  return result
})

const initData = async () => {
  try {
    await currentStore.loadCurrentUserBusiList()
  } catch (e) {
    console.error(e)
  }
}

const onClickEditBtn = async () => {
  try {
    await router.push({ name: 'ProfileUpdateForm' })
  } catch (e) {
    console.error(e)
  }
}

initData()
</script>
