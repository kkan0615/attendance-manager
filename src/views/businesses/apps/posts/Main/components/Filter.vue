<template>
  <q-form
    @submit="onSubmitForm"
  >
    <div
      class="tw-flex tw-items-center tw-space-x-2"
    >
      <!-- @TODO: Add i18n to label -->
      <q-select
        v-model="option"
        class="tw-w-40"
        hide-bottom-space
        dense
        outlined
        label="option"
        :options="options"
        emit-value
        map-options
      />
      <!-- Title -->
      <q-input
        v-model="str"
        class="tw-grow"
        dense
        outlined
        :placeholder="strPlaceholder"
      />
      <!-- Search button -->
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
import { computed, ref } from 'vue'
import { toCapitalizeFirstLetter } from '@/utils/commons/stringUtil'
import { BusiPostListSelectListQueryOptionType } from '@/types/models/businesses/post'

const busiPostStore = useBusiPostStore()

const { busiPostListFilter } = storeToRefs(busiPostStore)
const option = ref<BusiPostListSelectListQueryOptionType | undefined>(busiPostListFilter.value.option)
const str = ref('')
// @TODO: Add i18n to label
const options = ref<{ label: string; value: BusiPostListSelectListQueryOptionType}[]>([
  {
    label: toCapitalizeFirstLetter('title'),
    value: 'title',
  },
  {
    label: toCapitalizeFirstLetter('author'),
    value: 'author',
  },
  {
    label: toCapitalizeFirstLetter('title + author'),
    value: 'titleAndAuthor',
  }
])

// @TODO: Add i18n to label
const strPlaceholder = computed(() => option.value ? option.value : '')

const onSubmitForm = async () => {
  try {
    /* Set the filter options */
    busiPostListFilter.value.option = option.value
    busiPostListFilter.value.str = str.value
    /* Load busi post list, not load notification */
    await busiPostStore.loadBusiPostList()
  } catch (e) {
    console.error(e)
  }
}
</script>
