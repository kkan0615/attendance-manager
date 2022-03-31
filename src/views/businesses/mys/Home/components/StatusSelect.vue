<template>
  <div
    class="tw-w-full"
  >
    <q-select
      outlined
      dense
      :disable="!currentStore.CurrentBusiUser.startWorkAt"
      rounded
      :model-value="currentStore.CurrentBusiUser.status"
      :options="options"
      :option-disable="optionDisabled"
      :label="currentStore.CurrentBusiUser.status ? undefined : 'Status'"
      map-options
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeStatusSelect',
}
</script>
<script setup lang="ts">
import { useCurrentStore } from '@/store/current'
import { ref } from 'vue'
import { BusiUserStatus, userStatusSelectOption } from '@/types/models/users/business'
import { useBusiUserStore } from '@/store/busiUser'

const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()
const options = ref(userStatusSelectOption)

const optionDisabled = (option: { label: string; value: BusiUserStatus }) => {
  return !!currentStore.CurrentBusiUser.startWorkAt && option.value === 'off'
}

const onUpdateModelValue = async (option: { label: string; value: BusiUserStatus }) => {
  try {
    /* Update the data of busi user */
    await busiUserStore.updateBusiUser({
      ...currentStore.CurrentBusiUser,
      status: option.value, // change the status
    })
    /* Reload current busi user */
    await currentStore.loadCurrentBusiUser({
      userId: currentStore.CurrentBusiUser.userId,
      busiId: currentStore.CurrentBusiUser.busiId
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
