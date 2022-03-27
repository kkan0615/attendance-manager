<template>
  <div
    class="tw-w-full"
  >
    <q-select
      class="tw-border-amber-200"
      outlined
      dense
      :disable="!currentStore.CurrentBusiUser.startWorkAt"
      rounded
      :model-value="currentStore.CurrentBusiUser.status"
      :options="options"
      :option-disable="optionDisabled"
      :label="currentStore.CurrentBusiUser.status ? undefined : 'Status'"
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
import { UserStatus, userStatusSelectOption } from '@/types/models/users/business'

const currentStore = useCurrentStore()
const options = ref(userStatusSelectOption)


const optionDisabled = (option: { label: string; value: UserStatus }) => {
  return currentStore.CurrentBusiUser.startWorkAt && option.value === 'off'
}

const onUpdateModelValue = async (option: { label: string; value: UserStatus }) => {
  try {
    /* Update the data of busi user */
    await currentStore.updateCurrentBusiUser({
      ...currentStore.CurrentBusiUser,
      status: option.value, // change the status
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
