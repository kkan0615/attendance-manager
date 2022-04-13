<template>
  <q-form
    @submit="onSubmitForm"
  >
    <div
      class="tw-flex tw-items-center"
    >
      <q-input
        v-model="title"
        dense
        outlined
        label="title"
      />
      <q-btn
        class="tw-ml-auto"
        color="primary"
        type="submit"
        :label="$t('Commons.Buttons.search')"
      />
    </div>
  </q-form>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationMainFilter',
}
</script>
<script setup lang="ts">
import { useBusiPostStore } from '@/store/busiPost'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const busiPostStore = useBusiPostStore()

const { busiPostListFilter } = storeToRefs(busiPostStore)
const title = ref('')

const onSubmitForm = async () => {
  try {
    /* Set the filter options */
    busiPostListFilter.value.title = title.value
    /* Load busi post list, not load notification */
    await busiPostStore.loadBusiPostList()
  } catch (e) {
    console.error(e)
  }
}
</script>
